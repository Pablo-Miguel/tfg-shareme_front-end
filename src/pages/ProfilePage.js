import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData, useNavigate } from "react-router-dom";

import useUser from "../hooks/useUser";
import StuffCard from "../components/StuffCard/StuffCard";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Card from "../components/UIs/Card/Card";

const ProfilePage = (props) => {
  const [ viewMoreCont, setViewMoreCont ] = useState(0);
  const [ viewMore, setViewMore ] = useState(false);
  const { user_id } = useParams();
  const user = useUser();
  const isMe = user_id === user._id;
  const loader = useRouteLoaderData("user-details");
  const [ frontUser, setFrontUser ] = useState(null);
  const { sendRequest: fetchMoreStuff } = useHttp();
  const { sendRequest: followUser } = useHttp();
  const navigate = useNavigate();

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
        total_stuff: loader.userStuff.total,
        collections: loader.userCollections.collections,
        total_collections: loader.userCollections.total
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
          total_stuff: data.total
        }));

        setViewMore(data.total <= (viewMoreCont + 1) * 10);

      });

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMoreCont]);

  const onClickFollowHandler = () => {

    followUser(
      {
        url: `http://localhost:8000/users/${user_id}/follow`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      },
      (data) => {
          
          setFrontUser((prevState) => ({
            ...prevState,
            isFollowing: true,
            followers: prevState.followers + 1
          }));
  
        }
    );

  };

  const onClickViewMoreHandler = () => {
    setViewMoreCont((prevState) => prevState + 1);
  };

  const onClickDetailsHandler = (event) => {
    navigate(`/collection-details/${event.target.id}`);
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
              {
                isMe ? (
                  <div>
                    <button
                      style={{
                        width: "100px",
                        height: "30px",
                        margin: "10px",
                      }}
                      type="button"
                      disabled={true}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      style={{
                        width: "100px",
                        height: "30px",
                        margin: "10px",
                      }}
                      type="button"
                      disabled={frontUser.isFollowing}
                      onClick={onClickFollowHandler}
                    >
                      Follow
                    </button>
                  </div>
                )

              }
            </div>
          </div>
          <div>
            <h3>Posted stuff</h3>
            <div>
              {frontUser.total_stuff === 0 && <h1>No stuff found yet!</h1>}
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
                  owner={item.owner.nickName}
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
          <div>
            <h3>Posted collections</h3>
            <div>
              {frontUser.total_collections === 0 && <h1>No collections found yet!</h1>}
              {frontUser.collections.map((item) => (
                <div key={item._id}>
                  <Card>
                      <h2>{item.title}</h2>
                      <p>Stuff: {item.stuff.length}</p>
                      <p>Created by: {item.owner.nickName}</p>
                      <button type="button" onClick={onClickDetailsHandler} id={item._id}>Details</button>
                      <button type="button">Like</button>
                  </Card>
                </div>
              ))}
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
