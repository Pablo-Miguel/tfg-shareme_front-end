import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeStuff } from "../../store/stuff-store/stuff-actions";
import Card from "../UIs/Card/Card";
import classes from "./StuffCard.module.css";

const StuffCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likeHandler = (event) => {
    dispatch(likeStuff(props.id));
    event.target.disabled = true;
  };

  const detailsHandler = () => {
    navigate(`/details/${props.id}/${props.isLiked}`, { replace: true });
  }

  return (
    <>
      <Card>
        <div className={classes.stuffCard__image}>
          <img src={props.img} alt="stuff" />
        </div>
        <div className={classes.stuffCard__info}>
          <h2 className={classes.stuffCard__title}>{props.title}</h2>
          <p>Views: {props.views}</p>
          <p>Likes: {props.likes}</p>
          <p>Category: {props.category}</p>
          <p>Owner: {props.owner}</p>
          <p className={classes.stuffCard__price}>Price: {props.price}€</p>
          {props.has_offer && (
            <p>
              Offer: <span>{props.offer_price}€</span>
            </p>
          )}
        </div>
        <button className={classes.stuffCard__button} onClick={detailsHandler}>Details</button>
        <button className={classes.stuffCard__button} onClick={likeHandler} disabled={props.isLiked}>Like</button>
      </Card>
    </>
  );
};

export default StuffCard;
