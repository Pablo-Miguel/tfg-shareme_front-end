import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Card, CardOverflow, Divider, Typography } from "@mui/joy";
import { Grid } from "@mui/material";

import PositionedMenu from "../UIs/PositionedMenu/PositionedMenu";
import RedEyeIconBtn from "../UIs/RedEyeIconBtn/RedEyeIconBtn";
import FavoriteIconBtn from "../UIs/FavoriteIconBtn/FavoriteIconBtn";
import ImgCarousel from "../UIs/ImgCarousel/ImgCarousel";
import Alert from "../Alert/Alert";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import useHttp from "../../hooks/useHttp";
import { getAuthToken } from "../../utils/storage";

import classes from "./CollectionCard.module.css";

const CollectionCard = ({ collection: inputCollection, isMine }) => {
    const [ collection, setCollection ] = useState(inputCollection);
    const navigate = useNavigate();
    const { sendRequest: sendLike } = useHttp();
    const { error, sendRequest: fetchDeleteCollection } = useHttp();
    const [ openModal, setOpenModal ] = useState(false);
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

    const profileHandler = () => {
        navigate(`/profile/${collection.owner._id}`, { replace: true });
    }

    const detailsHandler = () => {
        navigate(`/collection-details/${collection._id}`, { replace: true });
    }

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
        
    }

    const onEditClickHandler = () => {
        navigate(`/edit-collection/${collection._id}`, { replace: true });
    }

    const onDeleteClickHandler = () => {
        setOpenModal(true);
    }

    const onDeleteHandler = () => {

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
              navigate(0);
            }, 1200);
          }
        );
    
      }

    return (
        <>
            <Card variant="outlined" className={classes.card}>
                <CardOverflow 
                    variant="soft"
                    className={classes.cardOverflowHeader}
                >
                    <CardOverflow
                        className={classes.cardOverflowProfile}
                        onClick={profileHandler}
                    >
                        <Avatar src={collection.owner.avatar} alt={collection.owner.nickName} 
                            className={classes.avatar}
                        />
                        <Typography
                            level="body1"
                            className={classes.text}
                        >
                            {collection.owner.nickName}
                        </Typography>
                    </CardOverflow>
                    {
                        isMine && (
                            <CardOverflow className={classes.positionedMenu}>
                                <PositionedMenu onEditClick={onEditClickHandler} onDeleteClick={onDeleteClickHandler} />
                            </CardOverflow>
                        )
                    }
                </CardOverflow>

                <Divider />

                <CardOverflow>
                    <Grid container>
                        <Grid item xs={12}>
                            <ImgCarousel stuff={collection.stuff.slice(0, 5)} />
                        </Grid>
                    </Grid>
                    <RedEyeIconBtn onClick={detailsHandler} />
                    <FavoriteIconBtn isLiked={collection.isLiked} onClick={likeHandler} isMine={isMine} />
                </CardOverflow>

                <CardOverflow
                    className={classes.cardOverflowBody}
                >
                    <CardOverflow>
                        <Typography level="body1" className={`${classes.title} ${classes.decoration}`}>
                            {collection.title}
                        </Typography>
                        <Typography level="body2" className={classes.decoration}>
                            Number of stuff: {collection.stuff.length}
                        </Typography>
                    </CardOverflow>
                </CardOverflow>

                <Divider />

                <CardOverflow
                    variant="soft"
                    className={classes.cardOverflowHeader}
                >
                    <Typography
                        level="body3"
                        className={classes.text}
                    >
                        {collection.views} views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography
                        level="body3"
                        className={classes.text}
                    >
                        {collection.likes} likes
                    </Typography>
                </CardOverflow>
            </Card>
            <DeleteConfirmationModal open={openModal} setOpen={setOpenModal} type='stuff' onDelete={onDeleteHandler} />
            {open && !error ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Your stuff has been deleted successfully!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error} />
            )}
        </>
    );
};

export default CollectionCard;