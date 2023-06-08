import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AspectRatio } from "@mui/joy";

import ImgCarousel from "../UIs/ImgCarousel/ImgCarousel";

import not_found from "../../assets/imgs/resource/not-found.jpg";
import classes from "./CollectionHeaderBodyDetail.module.css";

const CollectionHeaderBodyDetail = ({ collection }) => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`/profile/${collection.owner._id}`);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }} className={classes.boxContainer}>
                <Grid item xs={12} container className={classes.contentSpace} onClick={navigateHandler}>
                    <Avatar src={collection.owner.avatar} alt={collection.owner.name} 
                        className={classes.avatar}
                    />
                    <Typography variant="p" component="p">
                        {collection.owner.nickName}
                    </Typography>
                </Grid>
            </Box>
            <Grid item xs={12} className={classes.carousel}>
                {collection.stuff.length > 0 && <ImgCarousel stuff={collection.stuff} />}
                {collection.stuff.length === 0 &&
                    <AspectRatio ratio={1}>
                        <img src={not_found} alt="Image not found" />
                    </AspectRatio>
                }
            </Grid>
            <Grid item container className={classes.info}>
                <Grid item xs={6} container className={classes.infoContainer}>
                    <Typography variant="p" component="p"
                        className={classes.infoDetails}
                    >
                        <RemoveRedEyeIcon color="secondary" /> {collection.views}
                    </Typography>
                </Grid>
                <Grid item xs={6} container className={classes.infoContainer}>
                    <Typography variant="p" component="p"
                        className={classes.infoDetails}
                    >
                    <FavoriteIcon color="error" /> {collection.likes}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default CollectionHeaderBodyDetail;