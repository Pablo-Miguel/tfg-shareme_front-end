import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import StuffCard from "../components/StuffCard/StuffCard";
import { fetchStuff } from "../store/stuff-store/stuff-actions";

const HomePage = () => {
  const stuff = useSelector((state) => state.stuff);
  const dispatch = useDispatch();
  const searchBarInputRef = useRef();

  useEffect(() => {
    dispatch(fetchStuff());
  }, [dispatch]);

  const searchBarHandler = (event) => {
    dispatch(fetchStuff(0, searchBarInputRef.current.value));
  };

  const onClickPreviousHandler = () => {
    dispatch(fetchStuff(stuff.page - 1, searchBarInputRef.current.value));
  };

  const onClickNextHandler = () => {
    dispatch(fetchStuff(stuff.page + 1, searchBarInputRef.current.value));
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Home Page
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          style={{
            width: "100%",
            height: "30px",
            margin: "10px",
          }}
          type="text"
          name="search_bar"
          id="search_bar"
          placeholder="Search for stuff..."
          ref={searchBarInputRef}
          onChange={searchBarHandler}
        />
        <button
          style={{
            width: "100px",
            height: "30px",
            margin: "10px",
          }}
          type="button"
          onClick={searchBarHandler}
        >
          Search
        </button>
      </div>
      <div
        id="divider"
        style={{
          height: "1px",
          backgroundColor: "grey",
          margin: "10px",
        }}
      ></div>
      {!stuff.isLoading && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {stuff.total === 0 && <h1>No stuff found yet!</h1>}
            {stuff.stuff.map((item) => (
              <StuffCard
                key={item._id}
                id={item._id}
                title={item.title}
                price={item.price}
                img={item.image}
                views={item.views}
                likes={item.likes}
                category={item.category}
                owner={item.owner.name}
                has_offer={item.has_offer}
                offer_price={item.offer_price}
                isLiked={item.isLiked}
              />
            ))}
            {Math.ceil(stuff.total / stuff.limit) > 1 && (
              <div
                style={{ 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    margin: "10px",
                  }}
                  type="button"
                  onClick={onClickPreviousHandler}
                  disabled={stuff.page === 0}
                >
                  Previous
                </button>
                <h1
                  style={{
                    margin: "10px",
                  }}
                >
                  {stuff.page + 1}/{Math.ceil(stuff.total / stuff.limit)}
                </h1>
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    margin: "10px",
                  }}
                  type="button"
                  onClick={onClickNextHandler}
                  disabled={stuff.total <= (stuff.page + 1) * stuff.limit}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {stuff.isLoading && !stuff.error && <h1>Loading Stuff...</h1>}
      {stuff.error && (
        <h1>
          Error: {stuff.error.status} - {stuff.error.message}
        </h1>
      )}
    </>
  );
};

export default HomePage;
