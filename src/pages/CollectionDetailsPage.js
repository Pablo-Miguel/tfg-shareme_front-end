import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";

import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import useUser from "../hooks/useUser";
import CollectionHeaderBodyDetail from "../components/CollectionHeaderBodyDetail/CollectionHeaderBodyDetail";
import CollectionBodyDetail from "../components/CollectionBodyDetail/CollectionBodyDetail";
import StuffList from "../components/StuffList/StuffList";
import Alert from "../components/Alert/Alert";

const CollectionDetailsPage = () => {
    const user = useUser();
    const loader = useRouteLoaderData("collection-details");
    const navigate = useNavigate();
    const [ collection, setCollection ] = useState(loader.collection); 
    const effectExecutedRef = useRef(false);
    const { sendRequest: sendCollectionView } = useHttp();
    const { sendRequest: sendLike } = useHttp();
    const { error, sendRequest: fetchDeleteCollection } = useHttp();
    const isMine = collection.owner._id === user._id;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error && error !== '') {
            setOpen(true);
        }
    }, [error]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
    };

    useEffect(() => {
        if (!loader || effectExecutedRef.current) {
            return;
        }

        effectExecutedRef.current = true;

        sendCollectionView(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/view`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            },
            (data) => {
                setCollection((prevState) => ({
                    ...prevState,
                    views: data.views
                }));
            }

        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const likeHandler = () => {
            
        sendLike({
            url: collection.isLiked ? `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/unlike` : `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/like`,
            method: collection.isLiked ? "DELETE" : "POST",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }, (data) => {
            setCollection((prevState) => ({
                ...prevState,
                isLiked: collection.isLiked ? false : true,
                likes: data.likes
            }));
        });
        
    };

    const onClickPagination = (data) => {
        setCollection((prevState) => ({
            ...prevState,
            stuff: data.stuff,
            totalStuff: data.totalStuff
        }));
    };

    const onDeleteHandler = (event) => {
        fetchDeleteCollection(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            },
            (data) => {
                setOpen(true);
                setTimeout(() => {
                    navigate("/");
                }, 1200);
            }
        );
    };

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h4" style={{ fontWeight: "bold"}}>
                            Collection Details Page
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} container justifyContent="center">
                        <CollectionHeaderBodyDetail collection={collection} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={8}>
                        <CollectionBodyDetail collection={collection} onLike={likeHandler} user={user} onDelete={onDeleteHandler} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5"
                            style={{ fontWeight: "bold" }}
                        >
                            Stuff
                        </Typography>

                        <StuffList stuff={collection.stuff} total={collection.totalStuff} isMe={isMine} user_id={user._id} setData={onClickPagination} url_base={
                            `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}?`
                        }/>
                    </Grid>

                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            {open && !error ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Your collection has been deleted successfully!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error} />
            )}
        </>
    );
};

export default CollectionDetailsPage;
