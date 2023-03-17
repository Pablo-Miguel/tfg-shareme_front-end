import React, { useRef, useState } from "react";

import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";

const categories = [
  "Music",
  "Photography",
  "Technology",
  "Clothes",
  "Kitchen",
  "Sports",
  "Decoration",
  "Books",
  "Other",
];

const AddStuffPage = () => {
  const [success, setSuccess] = useState(false);
  const [hasOffer, setHasOffer] = useState(false);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const hasOfferInputRef = useRef();
  const offerPriceInputRef = useRef();
  const categorySelectRef = useRef();
  const shopping_linkInputRef = useRef();
  const { isLoading, error, sendRequest: sendNewStuff } = useHttp();

  const onChangeHandler = () => {
    setHasOffer((prevState) => !prevState);
  };

  const sendStuffHandler = (event) => {
    event.preventDefault();

    setSuccess(false);
    
    sendNewStuff(
      {
        url: "http://127.0.0.1:8000/stuff/add-new-stuff",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          title: titleInputRef.current.value,
          description: descriptionInputRef.current.value,
          price: priceInputRef.current.value,
          category: categorySelectRef.current.value,
          shopping_link: shopping_linkInputRef.current.value,
          has_offer: hasOfferInputRef.current.checked,
          offer_price: !offerPriceInputRef.current
            ? 0
            : offerPriceInputRef.current.value,
        },
      },
      (data) => {
        console.log(data);
      }
    );

    titleInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    priceInputRef.current.value = "";
    categorySelectRef.current.value = "";
    shopping_linkInputRef.current.value = "";
    hasOfferInputRef.current.checked = false;
    if (offerPriceInputRef.current) {
      offerPriceInputRef.current.value = "";
    }

    setHasOffer(false);
    
    setSuccess(true);
  };

  return (
    <div>
      <h1>Add Stuff</h1>
      <p>This page is for adding stuff to the database.</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "auto",
          gap: "10px",
        }}
        onBlur={() => setSuccess(false)}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" ref={titleInputRef} />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          ref={descriptionInputRef}
        />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" ref={priceInputRef} />
        <label htmlFor="has_offer">Has offer</label>
        <input
          type="checkbox"
          id="has_offer"
          name="has_offer"
          onChange={onChangeHandler}
          ref={hasOfferInputRef}
        />
        {hasOffer && (
          <>
            <label htmlFor="offer_price">Offer price</label>
            <input
              type="number"
              id="offer_price"
              name="offer_price"
              ref={offerPriceInputRef}
            />
          </>
        )}
        <label htmlFor="category">Category</label>
        <select name="category" id="category" ref={categorySelectRef}>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="shopping_link">Shopping link</label>
        <input
          type="text"
          id="shopping_link"
          name="shopping_link"
          ref={shopping_linkInputRef}
        />
        <button type="submit" onClick={sendStuffHandler}>
          {isLoading ? "Loading..." : "New stuff"}
        </button>
      </form>
      {success && <p>Success!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddStuffPage;
