import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { viewStuff } from "../store/stuff-store/stuff-actions";
import { likeStuff } from "../store/stuff-store/stuff-actions";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { stuff_id } = useParams();
  const navigate = useNavigate();
  const loader = useRouteLoaderData("stuff-details");
  const [current_stuff, setCurrentStuff] = useState(null);

  const effectExecutedRef = useRef(false);

  useEffect(() => {
    if (!loader || effectExecutedRef.current) {
      return;
    }

    

    effectExecutedRef.current = true;

    dispatch(viewStuff(stuff_id));

    setCurrentStuff((prevState) => {
      return {
        stuff: {
          ...loader.stuff,
          views: loader.stuff.views + 1
        },
        isLiked: loader.isLiked,
      };
    });
  }, []);

  useEffect(() => {
    if (!loader) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate, loader]);

  const likeHandler = (event) => {
    dispatch(likeStuff(current_stuff.stuff._id));

    setCurrentStuff((prevState) => {
      return {
        stuff: {
          ...prevState.stuff,
          likes: prevState.stuff.likes + 1,
        },
        isLiked: true,
      };
    });

    event.target.disabled = true;
  };

  return <>
    {!current_stuff ? 
        <h1>Loading...</h1> 
    : 
        <>
          <h1>Details Page</h1>
          <img src={current_stuff.stuff.image} alt="stuff_image"/>
          <h2>{current_stuff.stuff.title}</h2>
          <p>{current_stuff.stuff.description}</p>
          <p>Views: {current_stuff.stuff.views}</p>
          <p>Likes: {current_stuff.stuff.likes}</p>
          <p>Category: {current_stuff.stuff.category}</p>
          <p>Owner: {current_stuff.stuff.owner.name}</p>
          <p>Price: {current_stuff.stuff.price}€</p>
          {current_stuff.stuff.has_offer && (
              <p>
                  Offer: <span>{current_stuff.stuff.offer_price}€</span>
              </p>
          )}
          <a href={current_stuff.stuff.shopping_link}  target="_blank" rel="noopener noreferrer">To by click here</a>
          <p>Creation day: {current_stuff.stuff.createdAt}</p>
          <p>Last update: {current_stuff.stuff.updatedAt}</p>
          <button onClick={likeHandler} disabled={current_stuff.isLiked}>Like</button>
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
