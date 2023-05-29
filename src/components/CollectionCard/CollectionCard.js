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

const CollectionCard = ({ collection: inputCollection, isMine }) => {
    const [ collection, setCollection ] = useState(inputCollection);
    const navigate = useNavigate();
    const { sendRequest: sendLike } = useHttp();
    const { sendRequest: sendUnlike } = useHttp();

    const profileHandler = () => {
        navigate(`/profile/${collection.owner._id}`, { replace: true });
    }

    const detailsHandler = () => {
        navigate(`/collection-details/${collection._id}`, { replace: true });
    }

    const likeHandler = (event) => {
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
                <ImgCarousel stuff={collection.stuff.slice(0, 5)} />
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