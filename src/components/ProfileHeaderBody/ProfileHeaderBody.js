import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import FollowersModal from "../FollowersModal/FollowersModal";

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
            <Grid item xs={12} container justifyContent="center">
                <img src={frontUser.avatar} alt="stuff_image" style={{ minHeight: 300 }} />
            </Grid>
            <Grid item padding={2} container>
                <Grid item xs={6} container justifyContent="center" onClick={onFollowersClickHandler}>
                    <Typography variant="p" component="p"
                        style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                        {frontUser.followers} followers
                    </Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="center" onClick={onFollowingClickHandler}>
                    <Typography variant="p" component="p"
                        style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                        {frontUser.following} following
                    </Typography>
                </Grid>
            </Grid>
            <FollowersModal title={title} open={open} setOpen={setOpen} type={type} userId={frontUser._id} />
        </>
    );
};

export default ProfileHeaderBody;