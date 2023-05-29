import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeStuff, unlikeStuff } from "../../store/stuff-store/stuff-actions";
import classes from "./StuffCard.module.css";
import { AspectRatio, Avatar, Card, CardOverflow, Divider, Typography } from "@mui/joy";
import PositionedMenu from "../UIs/PositionedMenu/PositionedMenu";
import RedEyeIconBtn from "../UIs/RedEyeIconBtn/RedEyeIconBtn";
import FavoriteIconBtn from "../UIs/FavoriteIconBtn/FavoriteIconBtn";

const StuffCard = ({ stuff: inputStuff, isMine }) => {
  const [ stuff, setStuff ] = useState(inputStuff);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likeHandler = (event) => {
    if(stuff.isLiked) {
      dispatch(unlikeStuff(stuff._id));
      setStuff({ ...stuff, isLiked: false, likes: stuff.likes - 1 });
    } else {
      dispatch(likeStuff(stuff._id));
      setStuff({ ...stuff, isLiked: true, likes: stuff.likes + 1 });
    }
  };

  const detailsHandler = () => {
    navigate(`/stuff-details/${stuff._id}`, { replace: true });
  }

  const profileHandler = () => {
    navigate(`/profile/${stuff.owner._id}`, { replace: true });
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
          <Avatar src={stuff.owner.avatar} alt={stuff.owner.name} 
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Typography
            level="body1"
            sx={{
              fontWeight: "md",
              color: "text.secondary",
            }}
          >
            {stuff.owner.nickName}
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
        <AspectRatio ratio="1">
            <img
              src={stuff.image}
              srcSet={stuff.image}
              loading="lazy"
              alt={stuff.title}
            />
        </AspectRatio>
        <RedEyeIconBtn onClick={detailsHandler} />
        <FavoriteIconBtn isLiked={stuff.isLiked} onClick={likeHandler} isMine={isMine} />
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
          <Typography level="h2" sx={{ fontSize: "lg", mt: 2 }}>
            {stuff.title}
          </Typography>
          <Typography level="body2" sx={{ fontSize: "md", mt: 0.5, mb: 2 }}>
            {stuff.category}
          </Typography>
        </CardOverflow>

        {
          stuff.has_offer ? (
            <CardOverflow sx={{ mt: "auto", mb: "auto" }}>
              <Typography level="body2" sx={{ fontSize: "md", mt: 2, textDecoration: "line-through" }}>
                {stuff.price}€
              </Typography>
              <Typography level="h2" sx={{ fontSize: "lg", fontWeight: "bold" }} color="success">
                {stuff.offer_price}€
              </Typography>
            </CardOverflow>
          ) : (
            <CardOverflow sx={{ mt: "auto", mb: "auto" }}>
              <Typography level="h1" sx={{ fontSize: "lg", fontWeight: "bold" }}>
                {stuff.price}€
              </Typography>
            </CardOverflow>
          )
        }

        {
          stuff.has_offer && (
            <CardOverflow sx={{ mt: "auto", mb: "auto" }}>
              <Typography level="body2" sx={{ fontSize: "lg", mt: 2, fontWeight: "bold" }} color="danger">
                {Math.round(((stuff.price - stuff.offer_price) / stuff.price) * 100)}%
              </Typography>
            </CardOverflow>
          )
        }
        
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
          {stuff.views} views
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          {stuff.likes} likes
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default StuffCard;
