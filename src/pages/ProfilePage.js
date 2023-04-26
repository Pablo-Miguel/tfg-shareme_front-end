import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";

import PageContent from "../components/Layouts/PageContent/PageContent";
import useUser from "../hooks/useUser";
import StuffCard from "../components/StuffCard/StuffCard";

const ProfilePage = (props) => {
  const { user_id } = useParams();
  const user = useUser();
  const isMe = user_id == user._id;
  const loader = useRouteLoaderData("user-details");
  const [ frontUser, setFrontUser ] = useState(null);

  useEffect(() => {

    if(loader){

      if (!isMe) {
        setFrontUser(loader.user);
      } else {
        setFrontUser(user);
      }

      setFrontUser((prevState) => ({
        ...prevState,
        stuff: loader.userStuff,
        total: loader.userStuff.length
      }));

    }

  }, [loader]);

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
                  owner={item.owner}
                  has_offer={item.has_offer}
                  offer_price={item.offer_price}
                  isLiked={true}
                />
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
