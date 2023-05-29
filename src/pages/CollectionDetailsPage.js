import React, { useEffect, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";



import StuffCard from "../components/StuffCard/StuffCard";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import useUser from "../hooks/useUser";
import CollectionHeaderBodyDetail from "../components/CollectionHeaderBodyDetail/CollectionHeaderBodyDetail";
import CollectionBodyDetail from "../components/CollectionBodyDetail/CollectionBodyDetail";

const CollectionDetailsPage = () => {
    const user = useUser();
    const loader = useRouteLoaderData("collection-details");
    const [ collection, setCollection ] = useState(loader.collection); 
    const effectExecutedRef = useRef(false);
    const { sendRequest: sendCollectionView } = useHttp();
    const { sendRequest: sendLike } = useHttp();
    const { sendRequest: sendUnlike } = useHttp();
    const isMine = collection.owner._id === user._id;

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
        if(collection.isLiked) {
            
            sendUnlike({
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/unlike`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            }, (data) => {
                setCollection((prevState) => ({
                    ...prevState,
                    isLiked: false,
                    likes: data.likes
                }));
            });

        } else {

            sendLike({
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/collections/${collection._id}/like`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            }, (data) => {
                setCollection((prevState) => ({
                    ...prevState,
                    isLiked: true,
                    likes: data.likes
                }));
            });
            
        }
    }

    return (
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
                    <CollectionBodyDetail collection={collection} onLike={likeHandler} user={user} />
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

                    <Grid container spacing={2}>
                        { collection.stuff.length > 0 ?
                            collection.stuff.map((item) => (
                                <Grid item xs={12} md={6} lg={6} key={item._id} container justifyContent="center">
                                    <StuffCard
                                        id={item._id}
                                        stuff={item}
                                        isMine={isMine}
                                    />
                                </Grid>
                            ))
                        : 
                            <Grid item xs={12} container justifyContent="center">
                                <Typography variant="h6" component="h6" >
                                    This collection is empty
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={0} md={1} lg={2}></Grid>
        </Grid>
    );
};

export default CollectionDetailsPage;
