import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { viewStuff } from "../store/stuff-store/stuff-actions";
import { likeStuff } from "../store/stuff-store/stuff-actions";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { stuff_id, isLiked } = useParams();
  const isLikedBool = isLiked === "true" ? true : false;
  const navigate = useNavigate();
  const stuff = useSelector((state) => state.stuff.stuff);
  const isLoading = useSelector((state) => state.stuff.isLoading);
  const current_stuff = stuff.find((s) => s._id === stuff_id);

  const effectExecutedRef = useRef(false);

  useEffect(() => {
    if (!current_stuff || effectExecutedRef.current) {
      return;
    }

    effectExecutedRef.current = true;

    dispatch(viewStuff(stuff_id));
  }, []);

  useEffect(() => {
    if (!current_stuff && !isLoading) {
      navigate("/");
    }
  }, [current_stuff, isLoading, navigate]);

  const likeHandler = (event) => {
    dispatch(likeStuff(current_stuff._id));
    event.target.disabled = true;
  };

  return <>
    {!current_stuff ? 
        <h1>Loading...</h1> 
    : 
        <>
            <h1>Details Page</h1>
            <img src={current_stuff.image} alt="stuff_image"/>
            <h2>{current_stuff.title}</h2>
            <p>{current_stuff.description}</p>
            <p>Views: {current_stuff.views}</p>
            <p>Likes: {current_stuff.likes}</p>
            <p>Category: {current_stuff.category}</p>
            <p>Owner: {current_stuff.owner}</p>
            <p>Price: {current_stuff.price}€</p>
            {current_stuff.has_offer && (
                <p>
                    Offer: <span>{current_stuff.offer_price}€</span>
                </p>
            )}
            <a href={current_stuff.shopping_link}  target="_blank" rel="noopener noreferrer">To by click here</a>
            <p>Creation day: {current_stuff.createdAt}</p>
            <p>Last update: {current_stuff.updatedAt}</p>
            <button onClick={likeHandler} disabled={isLikedBool}>Like</button>
            {/* A divider for commets area */}
            <hr/>
            <h2>Comments</h2>
            <form>
                <label htmlFor="comment">Write your comment here:</label>
                <br/>
                <textarea id="comment" name="comment" cols={80} rows={10}/>
                <br/>
                <button type="button">Submit</button>
            </form>
            <p>Comments will be here</p>

        </>
    }
    </>;
};

export default DetailsPage;
