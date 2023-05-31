import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, CardOverflow, Divider, Typography } from "@mui/joy";

import classes from "./CollectionCard.module.css";
import PositionedMenu from "../UIs/PositionedMenu/PositionedMenu";
import RedEyeIconBtn from "../UIs/RedEyeIconBtn/RedEyeIconBtn";
import FavoriteIconBtn from "../UIs/FavoriteIconBtn/FavoriteIconBtn";
import ImgCarousel from "../UIs/ImgCarousel/ImgCarousel";
import useHttp from "../../hooks/useHttp";
import { getAuthToken } from "../../utils/storage";
import { Grid } from "@mui/material";

const CollectionCard = ({ collection: inputCollection, isMine }) => {
    const [ collection, setCollection ] = useState(inputCollection);
    const navigate = useNavigate();
    const { sendRequest: sendLike } = useHttp();

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

    return (
        <Card variant="outlined" className={classes.card}>
            <CardOverflow 
                variant="soft"
                sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    bgcolor: "background.level1",
                }}
            >
                <CardOverflow sx={{ mt: "auto", mb: "auto" }}
                    onClick={profileHandler}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5
                    }}
                >
                    <Avatar src={collection.owner.avatar} alt={collection.owner.nickName} 
                        style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    <Typography
                        level="body1"
                        sx={{
                        fontWeight: "md",
                        color: "text.secondary",
                        }}
                    >
                        {collection.owner.nickName}
                    </Typography>
                </CardOverflow>
                {
                    isMine && (
                        <CardOverflow sx={{ ml: "auto" }}>
                            <PositionedMenu />
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
                sx={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                py: 1.5,
                px: "var(--Card-padding)",
                bgcolor: "background.level",
                }}
            >
                <CardOverflow>
                    <Typography level="body1" sx={{ fontSize: "md", mt: 0.5, mb: 2 }}>
                        {collection.title}
                    </Typography>
                    <Typography level="body2" sx={{ fontSize: "md", mt: 0.5, mb: 2 }}>
                        Number of stuff: {collection.stuff.length}
                    </Typography>
                </CardOverflow>
            </CardOverflow>

            <Divider />

            <CardOverflow
                variant="soft"
                sx={{
                display: "flex",
                gap: 1.5,
                py: 1.5,
                px: "var(--Card-padding)",
                bgcolor: "background.level1",
                }}
            >
                <Typography
                    level="body3"
                    sx={{ fontWeight: "md", color: "text.secondary" }}
                >
                    {collection.views} views
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                    level="body3"
                    sx={{ fontWeight: "md", color: "text.secondary" }}
                >
                    {collection.likes} likes
                </Typography>
            </CardOverflow>
        </Card>
    );
};

export default CollectionCard;