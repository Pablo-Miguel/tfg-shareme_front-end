import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";

import ProfileTab from "../components/ProfileTab/ProfileTab";
import ProfileHeaderBody from "../components/ProfileHeaderBody/ProfileHeaderBody";
import ProfileBody from "../components/ProfileBody/ProfileBody";
import useUser from "../hooks/useUser";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Spinner from "../components/Spinner/Spinner";

const ProfilePage = (props) => {
  const { user_id } = useParams();
  const user = useUser();
  const [ isMe, setIsMe ] = useState(false);
  const loader = useRouteLoaderData("user-details");
  const [ frontUser, setFrontUser ] = useState(null);
  const { sendRequest: followUser } = useHttp();

  useEffect(() => {

    if(loader){

      setFrontUser({
        ...loader.user,
        stuff: loader.userStuff.stuff,
        total_stuff: loader.userStuff.total,
        collections: loader.userCollections.collections,
        total_collections: loader.userCollections.total,
        likedStuff: loader.userLikedStuff ? loader.userLikedStuff : null,
        likedCollections: loader.userLikedCollections ? loader.userLikedCollections : null,
      });
      
      setIsMe(user._id === loader.user._id);

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader]);

  const onClickFollowHandler = () => {
      
    followUser(
      {
        url: frontUser.isFollowing ? `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user_id}/unfollow` : `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user_id}/follow`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      },
      (data) => {

          setFrontUser((prevState) => ({
            ...prevState,
            isFollowing: frontUser.isFollowing ? false : true,
            followers: data.followers
          }));

        }
    );

  };

  return (
    <>
      {frontUser ? (
        <>
          <Grid container spacing={3} padding={2}>
            <Grid item xs={0} md={1} lg={2}></Grid>
            <Grid item xs={12} md={10} lg={8} container>
              <Grid item xs={12}>
                  <Typography variant="h4" component="h4" style={{ fontWeight: "bold"}}>
                    {isMe ? "My" : "User"} profile
                  </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <ProfileHeaderBody frontUser={frontUser} />
              </Grid>

              <Grid item xs={12} sm={6} md={8}>
                <ProfileBody frontUser={frontUser} isMe={isMe} onClickFollow={onClickFollowHandler} />
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
              </Grid>

              <Grid item xs={12}>
                { user && 
                  <ProfileTab 
                    frontUser={frontUser}
                    user_id={user_id}
                    isMe={isMe}
                    setFrontUser={setFrontUser}
                  />
                }
              </Grid>

            </Grid>
            <Grid item xs={0} md={1} lg={2}></Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2} justifyContent='center'>
          <Spinner />
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
