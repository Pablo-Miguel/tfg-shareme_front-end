import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { unlikeStuff, viewStuff } from "../store/stuff-store/stuff-actions";
import { likeStuff } from "../store/stuff-store/stuff-actions";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Spinner from "../components/Spinner/Spinner";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LikeToggleBtn from "../components/UIs/LikeToggleBtn/LikeToggleBtn";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import useUser from "../hooks/useUser";
import DetailsTab from "../components/DetailsTab/DetailsTab";

const DetailsPage = () => {
  const user = useUser();
  const { sendRequest: sendRating } = useHttp();
  const { sendRequest: sendQuestion } = useHttp();
  const { sendRequest: sendAnswer } = useHttp();
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

    setCurrentStuff(() => {
      return {
        stuff: {
          ...loader.stuff,
          views: loader.stuff.views + 1
        },
        isLiked: loader.isLiked,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loader) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate, loader]);

  const likeHandler = (event) => {
    if(current_stuff.isLiked) {
      dispatch(unlikeStuff(current_stuff.stuff._id));
      setCurrentStuff((prevState) => {
        return {
          stuff: {
            ...prevState.stuff,
            likes: prevState.stuff.likes - 1,
          },
          isLiked: false,
        };
      });
    } else {
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
    }
  };

  const onClickRatingFormHandler = (event) => {

    sendRating(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/ratingComments/${current_stuff.stuff._id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          rating: event.data.rating,
          comment: event.data.comment,
        },
      },
      (data) => {

        setCurrentStuff((prevState) => {
          return {
            ...prevState,
            stuff: {
              ...prevState.stuff,
              ratingComments: [data, ...prevState.stuff.ratingComments],
            },
          };
        });
        
        event.setValue(0);
        event.setText("");

      }
    );

  };

  const onClickQuestionFormHandler = (event) => {
    
    sendQuestion(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/questionAnswersComments/${current_stuff.stuff._id}/question`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          question: event.data.question,
        },
      },
      (data) => {

        setCurrentStuff((prevState) => {
          return {
            ...prevState,
            stuff: {
              ...prevState.stuff,
              questionAnswersComments: [data, ...prevState.stuff.questionAnswersComments],
            },
          };
        });

        event.setText("");
        
      }
    );

  };

  const onClickAnswerFormHandler = (event) => {
    sendAnswer(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/questionAnswersComments/${event.data.questionId}/answer`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          body: event.data.answer,
        },
      },
      (data) => {
        const answerList = current_stuff.stuff.questionAnswersComments.find((answer) => answer._id === event.data.questionId).answers;
        answerList.unshift(data);

        setCurrentStuff((prevState) => {
          return {
            ...prevState,
            stuff: {
              ...prevState.stuff,
              questionAnswersComments: prevState.stuff.questionAnswersComments.map((answer) => {
                if (answer._id === event.data.questionId) {
                  return {
                    ...answer,
                    answers: answerList,
                  };
                }

                return answer;
              }),
            },
          };
        });

        event.setText("");

      }
    );

  };


  return <>
    {!current_stuff ? 
        <Spinner />
    : 
      <>
        <Grid container spacing={1} padding={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" style={{ fontWeight: "bold"}}>
              Details Page
            </Typography>
            
            
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} container justifyContent="center">
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }} flexDirection="column">
              <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Typography variant="p" component="p">
                  {current_stuff.stuff.owner.nickName}
                </Typography>
              </Grid>

              <Typography variant="h6" component="h6"
                style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
              >
                <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
              </Typography>
            </Box>
            <Grid item xs={12} container justifyContent="center">
              <img src={current_stuff.stuff.image} alt="stuff_image" style={{ minHeight: 300 }} />
            </Grid>
            <Grid item padding={2} container>
              <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                  <RemoveRedEyeIcon color="secondary" /> {current_stuff.stuff.views}
                </Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                  <FavoriteIcon color="error" /> {current_stuff.stuff.likes}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }} flexDirection="column">
              <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Typography variant="p" component="p">
                  {current_stuff.stuff.owner.nickName}
                </Typography>
              </Grid>

              <Typography variant="h6" component="h6"
                style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
              >
                <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
              </Typography>
            </Box>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            
            <Typography variant="h5" component="h5"
              style={{ fontWeight: "bold" }}
            >
              {current_stuff.stuff.title}
            </Typography>
            <Typography variant="body1" component="p">
              {current_stuff.stuff.description}
            </Typography>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            {
              current_stuff.stuff.has_offer ? (
                <Grid item xs={6} container>
                  <div>
                    <Typography variant="h6" component="h6" color="grey"
                      style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "line-through" }}
                    >
                      <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                    </Typography>
                    <Typography variant="h5" component="h5" color="green"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
                    >
                      <LocalOfferRoundedIcon /> {current_stuff.stuff.offer_price}€
                    </Typography>
                  </div>
                  <div style={{ marginTop: "auto", marginLeft: 30 }}>
                    <Typography variant="h5" component="h5" color="error"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
                    >
                      {((current_stuff.stuff.price - current_stuff.stuff.offer_price) / current_stuff.stuff.price) * 100} <PercentRoundedIcon />
                    </Typography>
                  </div>
                </Grid>
              ) : (
                <Typography variant="h6" component="h6"
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                </Typography>
              )
            }

            <Button variant="contained" color="secondary" style={{ marginTop: 10 }} startIcon={<ShoppingCartOutlinedIcon />}>
              <Typography variant="p" component="a" href={current_stuff.stuff.shopping_link}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "white" }}>Shopping link</Typography>
            </Button>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            <LikeToggleBtn isLiked={current_stuff.isLiked} onClick={likeHandler} isMine={current_stuff.stuff.owner._id === user._id} />

            {
              current_stuff.stuff.owner._id === user._id && (
                <div>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }} startIcon={<EditRoundedIcon />}>
                    <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Edit</Typography>
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
                    <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Delete</Typography>
                  </Button>
                </div>
              )
            }
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Grid>

          <Grid item xs={12}>
            <DetailsTab 
              onClickRatingCommentsSubmit={onClickRatingFormHandler} 
              onClickQuestionsCommentsSubmit={onClickQuestionFormHandler}
              onClickQuestionAnswerSubmit={onClickAnswerFormHandler}
              stuff={current_stuff.stuff} 
              userId={user._id}
            />
          </Grid>
        </Grid>
      </>
    }
    </>;
};

export default DetailsPage;
