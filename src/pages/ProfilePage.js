import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";

import useUser from "../hooks/useUser";
import StuffCard from "../components/StuffCard/StuffCard";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";

const ProfilePage = (props) => {
  const [ viewMoreCont, setViewMoreCont ] = useState(0);
  const [ viewMore, setViewMore ] = useState(false);
  const { user_id } = useParams();
  const user = useUser();
  const isMe = user_id === user._id;
  const loader = useRouteLoaderData("user-details");
  const [ frontUser, setFrontUser ] = useState(null);
  const { sendRequest: fetchMoreStuff } = useHttp();

  useEffect(() => {

    if(loader){

      if (!isMe) {
        setFrontUser(loader.user);
      } else {
        setFrontUser(user);
      }

      setFrontUser((prevState) => ({
        ...prevState,
        stuff: loader.userStuff.stuff,
        total: loader.userStuff.total
      }));

      setViewMore(loader.userStuff.total <= (viewMoreCont + 1) * 10);

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader]);

  useEffect(() => {

    if(viewMoreCont !== 0){

      let url_base = 'http://127.0.0.1:8000/stuff?';

      if (!isMe) {
        url_base += `other_user_id=${user_id}`;
      } else {
        url_base += `isMine=${isMe}`;
      }

      url_base += `&limit=10`;
      url_base += `&skip=${viewMoreCont * 10}`;
      url_base += '&sortBy=createdAt:desc';

      fetchMoreStuff({
        url: url_base,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      }, (data) => {

        setFrontUser((prevState) => ({
          ...prevState,
          stuff: prevState.stuff.concat(data.stuff),
          total: data.total
        }));

        setViewMore(frontUser.total <= (viewMoreCont + 1) * 10);

      });

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMoreCont]);


  const onClickViewMoreHandler = () => {
    setViewMoreCont((prevState) => prevState + 1);
  };

  return (
    <>
      {frontUser ? (
        <div style={
          {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }
        }>
          <div>
            <h1>{isMe ? "My" : "User"} profile</h1>
            <div>
              <img src={frontUser.avatar} alt="profile" />
            </div>
            <div>
              <h2>{`${frontUser.firstName} ${frontUser.lastName}`}</h2>
              <p>Followers: {frontUser.followers}</p>
              <p>Following: {frontUser.following}</p>
            </div>
          </div>
          <div>
            <h3>Posted stuff  </h3>
            <div>
              {frontUser.total === 0 && <h1>No stuff found yet!</h1>}
              {frontUser.stuff.map((item) => (
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
                  isLiked={isMe ? true : item.isLiked}
                />
              ))}
              {!viewMore && <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}>
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    margin: "10px",
                  }}
                  type="button"
                  onClick={onClickViewMoreHandler}
                >
                  View more
                </button>
              </div>}
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>Loading...</h1>
      )}
    </>
  );
};

export default ProfilePage;
