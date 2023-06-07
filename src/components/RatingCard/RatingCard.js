import React from "react";
import { useNavigate } from "react-router-dom";

import { AspectRatio, Card, Typography } from "@mui/joy";
import { Grid, Rating } from "@mui/material";

import classes from "./RatingCard.module.css";

const RatingCard = ({ rating, comment, from }) => {
    const navigate = useNavigate();
    
    const navigateHandler = () => {
        navigate(`/profile/${from.id}`);
    };

    return(
        <Card
            variant="outlined"
            orientation="horizontal"
            className={classes.card}
        >
            <Grid container className={classes.container}>
                <Grid item xs={4} sm={3} md={2} className={classes.avatarContainer}>
                    <AspectRatio ratio="1" className={classes.avatar} onClick={navigateHandler}>
                        <img
                            src={from.avatar}
                            srcSet={from.avatar}
                            loading="lazy"
                            alt={from.nickName}
                        />
                    </AspectRatio>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                    <Grid container className={classes.container} onClick={navigateHandler}>
                        <Typography level="h6" aria-describedby="card-description" className={classes.nickName}>
                            {from.nickName}
                        </Typography>
                    </Grid>
                    <Rating name="read-only" value={rating} readOnly />
                    <Typography
                        level="body1"
                        id="card-description"
                        className={classes.body}
                    >
                        {comment}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default RatingCard;