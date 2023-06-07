import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeStuff, unlikeStuff } from "../../store/stuff-store/stuff-actions";
import { AspectRatio, Avatar, Card, CardOverflow, Divider, Typography } from "@mui/joy";
import PositionedMenu from "../UIs/PositionedMenu/PositionedMenu";
import RedEyeIconBtn from "../UIs/RedEyeIconBtn/RedEyeIconBtn";
import FavoriteIconBtn from "../UIs/FavoriteIconBtn/FavoriteIconBtn";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import useHttp from "../../hooks/useHttp";
import Alert from "../Alert/Alert";
import { getAuthToken } from "../../utils/storage";

import classes from "./StuffCard.module.css";

const StuffCard = ({ stuff: inputStuff, isMine }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ stuff, setStuff ] = useState(inputStuff);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, sendRequest: fetchDeleteStuff } = useHttp();
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

  const onEditClickHandler = () => {
    navigate(`/edit-stuff/${stuff._id}`, { replace: true });
  }

  const onDeleteClickHandler = () => {
    setOpenModal(true);
  }

  const onDeleteHandler = () => {

    fetchDeleteStuff(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${stuff._id}`,
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
            onClick={profileHandler}
            className={classes.cardOverflowProfile}
          >
            <Avatar src={stuff.owner.avatar} alt={stuff.owner.name} 
              className={classes.avatar}
            />
            <Typography
              level="body1"
              className={classes.text}
            >
              {stuff.owner.nickName}
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
          className={classes.cardOverflowBody}
        >
          <CardOverflow>
            <Typography level="h2" className={classes.title}>
              {stuff.title}
            </Typography>
            <Typography level="body2" className={classes.category}>
              {stuff.category}
            </Typography>
          </CardOverflow>

          {
            stuff.has_offer ? (
              <CardOverflow className={classes.priceContent}>
                <Typography level="body2" className={classes.priceLineThrough}>
                  {stuff.price}€
                </Typography>
                <Typography level="h2" className={classes.offerPrice} color="success">
                  {stuff.offer_price}€
                </Typography>
              </CardOverflow>
            ) : (
              <CardOverflow className={classes.priceContent}>
                <Typography level="h1" className={classes.offerPrice}>
                  {stuff.price}€
                </Typography>
              </CardOverflow>
            )
          }

          {
            stuff.has_offer && (
              <CardOverflow className={classes.priceContent}>
                <Typography level="body2" className={classes.percent} color="danger">
                  {Math.round(((stuff.price - stuff.offer_price) / stuff.price) * 100)}%
                </Typography>
              </CardOverflow>
            )
          }
          
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
            {stuff.views} views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            className={classes.text}
          >
            {stuff.likes} likes
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

export default StuffCard;
