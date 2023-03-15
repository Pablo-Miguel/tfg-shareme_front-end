import Card from "../UIs/Card/Card";
import classes from "./StuffCard.module.css";

const StuffCard = (props) => {
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
        <button className={classes.stuffCard__button}>Details</button>
      </Card>
    </>
  );
};

export default StuffCard;
