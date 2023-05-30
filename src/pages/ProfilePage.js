import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData, useNavigate } from "react-router-dom";

import useUser from "../hooks/useUser";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Spinner from "../components/Spinner/Spinner";

import { Button, Divider, Grid, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ProfileTab from "../components/ProfileTab/ProfileTab";

const ProfilePage = (props) => {
  const { user_id } = useParams();
  const user = useUser();
  const isMe = user_id === user._id;
  const loader = useRouteLoaderData("user-details");
  const [ frontUser, setFrontUser ] = useState(null);
  
  const { sendRequest: followUser } = useHttp();
  const navigate = useNavigate();

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
                <Grid item xs={12} container justifyContent="center">
                  <img src={frontUser.avatar} alt="stuff_image" style={{ minHeight: 300 }} />
                </Grid>
                <Grid item padding={2} container>
                  <Grid item xs={6} container justifyContent="center">
                    <Typography variant="p" component="p"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                      {frontUser.followers} followers
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="center">
                    <Typography variant="p" component="p"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                      {frontUser.following} following
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={8}>
                <Typography variant="h5" component="h5"
                    style={{ fontWeight: "bold" }}
                >
                    {frontUser.nickName}
                </Typography>
                <Typography variant="body1" component="p">
                    {frontUser.name}
                </Typography>

                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

                {
                  isMe ? (
                    <Grid item xs={12} container>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={true}
                        onClick={() => navigate("/")}
                      >
                        Edit profile
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xs={12} container>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickFollowHandler}
                        startIcon={frontUser.isFollowing ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />}
                      >
                        {frontUser.isFollowing ? "Stop following" : "Follow"}
                      </Button>
                    </Grid>
                  )
                }
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
              </Grid>

              <Grid item xs={12}>
                <ProfileTab 
                  frontUser={frontUser}
                  user_id={user_id}
                  isMe={isMe}
                  setFrontUser={setFrontUser}
                />
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
