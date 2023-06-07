import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";

import FollowersModal from "../FollowersModal/FollowersModal";

import classes from "./ProfileHeaderBody.module.css";

const ProfileHeaderBody = ({frontUser}) => {

    const [ open, setOpen ] = useState(false);
    const [ type, setType ] = useState(null);
    const [ title, setTitle ] = useState(null);


    const onFollowersClickHandler = () => {
        setTitle("Followers");
        setType("followers");
        setOpen(true);
    };

    const onFollowingClickHandler = () => {
        setTitle("Following");
        setType("following");
        setOpen(true);
    };

    return (
        <>
            <Grid item xs={12} container className={classes.container}>
                <img src={frontUser.avatar} alt="stuff_image" className={classes.avatar} />
            </Grid>
            <Grid item padding={2} container>
                <Grid item xs={6} container className={classes.container} onClick={onFollowersClickHandler}>
                    <Typography variant="p" component="p"
                        className={classes.text}
                    >
                        {frontUser.followers} followers
                    </Typography>
                </Grid>
                <Grid item xs={6} container className={classes.container} onClick={onFollowingClickHandler}>
                    <Typography variant="p" component="p"
                        className={classes.text}
                    >
                        {frontUser.following} following
                    </Typography>
                </Grid>
            </Grid>
            <FollowersModal title={title} open={open} setOpen={setOpen} type={type} userId={frontUser._id} setType={setType} />
        </>
    );
};

export default ProfileHeaderBody;