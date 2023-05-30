import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Divider, Grid, Typography } from "@mui/material";

import { unlikeStuff, viewStuff } from "../store/stuff-store/stuff-actions";
import { likeStuff } from "../store/stuff-store/stuff-actions";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Spinner from "../components/Spinner/Spinner";
import useUser from "../hooks/useUser";
import StuffDetailsTab from "../components/StuffDetailsTab/StuffDetailsTab";
import StuffBodyDetail from "../components/StuffBodyDetail/StuffBodyDetail";
import StuffHeaderBodyDetail from "../components/StuffHeaderBodyDetail/StuffHeaderBodyDetail";

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
      <Grid container spacing={1} padding={2}>
        <Grid item xs={0} md={1} lg={2}></Grid>
        <Grid item xs={12} md={10} lg={8} container>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" style={{ fontWeight: "bold"}}>
              Details Page
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} container justifyContent="center">
            <StuffHeaderBodyDetail current_stuff={current_stuff} />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <StuffBodyDetail current_stuff={current_stuff} onLike={likeHandler} user={user} />
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Grid>

          <Grid item xs={12}>
            <StuffDetailsTab 
              onClickRatingCommentsSubmit={onClickRatingFormHandler} 
              onClickQuestionsCommentsSubmit={onClickQuestionFormHandler}
              onClickQuestionAnswerSubmit={onClickAnswerFormHandler}
              stuff={current_stuff.stuff} 
              userId={user._id}
            />
          </Grid>
        </Grid>
        <Grid item xs={0} md={1} lg={2}></Grid>
      </Grid>
    }
    </>;
};

export default DetailsPage;
