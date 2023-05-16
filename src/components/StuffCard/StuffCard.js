import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeStuff } from "../../store/stuff-store/stuff-actions";
import classes from "./StuffCard.module.css";
import { AspectRatio, Avatar, Card, CardOverflow, Divider, IconButton, Typography } from "@mui/joy";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StuffCard = ({ stuff, isMine }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likeHandler = (event) => {
    dispatch(likeStuff(stuff._id));
    event.target.disabled = true;
  };

  const detailsHandler = () => {
    navigate(`/stuff-details/${stuff._id}`, { replace: true });
  }

  const profileHandler = () => {
    navigate(`/profile/${stuff.owner._id}`, { replace: true });
  }

  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 400, maxWidth: 400 }} className={classes.card}>
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
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              gap: 1.5
            }}
          >
            <Avatar src={stuff.owner.avatar} alt={stuff.owner.name} 
              sx={{ width: 25, height: 25, mr: 0.5 }}
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
              <CardOverflow sx={{ mt: "auto", mb: "auto", ml: "auto" }}>
                <IconButton
                  variant="plain"
                  aria-label="Settings"
                  sx={{ mt: 'auto', mb: 'auto' }}
                  color="neutral"
                  size="sm"
                >
                  <MoreVertIcon />
                </IconButton>
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
          <IconButton
            size="md"
            variant="solid"
            color="danger"
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '1rem',
              bottom: 0,
              transform: 'translateY(50%)',
            }}
            onClick={likeHandler}
            disabled={stuff.isLiked || isMine}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            size="md"
            variant="solid"
            color="info"
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '4rem',
              bottom: 0,
              transform: 'translateY(50%)',
            }}
            onClick={detailsHandler}
          >
            <RemoveRedEyeIcon />
          </IconButton>
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
                <Typography level="h2" sx={{ fontSize: "lg", fontWeight: "bold", fontSize: 20 }} color="danger">
                  {stuff.offer_price}€
                </Typography>
              </CardOverflow>
            ) : (
              <CardOverflow sx={{ mt: "auto", mb: "auto" }}>
                <Typography level="h1" sx={{ fontSize: "lg", fontWeight: "bold", fontSize: 24}}>
                  {stuff.price}€
                </Typography>
              </CardOverflow>
            )
          }

          {
            stuff.has_offer && (
              <CardOverflow sx={{ mt: "auto", mb: "auto" }}>
                <Typography level="body2" sx={{ fontSize: "lg", mt: 2, fontWeight: "bold" }} color="success">
                  {((stuff.price - stuff.offer_price) / stuff.price) * 100}%
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
    </>
  );
};

export default StuffCard;
