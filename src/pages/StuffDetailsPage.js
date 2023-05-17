import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { viewStuff } from "../store/stuff-store/stuff-actions";
import { likeStuff } from "../store/stuff-store/stuff-actions";
import Card from "../components/UIs/Card/Card";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";

const DetailsPage = () => {
  const { sendRequest: sendRating } = useHttp();
  const { sendRequest: sendQuestion } = useHttp();
  const { sendRequest: sendAnswer } = useHttp();
  const dispatch = useDispatch();
  const { stuff_id } = useParams();
  const navigate = useNavigate();
  const loader = useRouteLoaderData("stuff-details");
  const [current_stuff, setCurrentStuff] = useState(null);
  const ratingStarsOptions = useRef();
  const ratingCommentInput = useRef();
  const questionInput = useRef();
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

  const onClickRatingFormHandler = (event) => {
    event.preventDefault();

    sendRating(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/ratingComments/${current_stuff.stuff._id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          rating: ratingStarsOptions.current.value,
          comment: ratingCommentInput.current.value,
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

        ratingCommentInput.current.value = "";

      }
    );

  };

  const onClickQuestionFormHandler = (event) => {
    event.preventDefault();
    
    sendQuestion(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/questionAnswersComments/${current_stuff.stuff._id}/question`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          question: questionInput.current.value,
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

        questionInput.current.value = "";

      }
    );

  };

  const onClickAnswerFormHandler = (event) => {
    event.preventDefault();

    sendAnswer(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/questionAnswersComments/${event.target.id}/answer`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: {
          body: event.target.parentNode.childNodes[1].value,
        },
      },
      (data) => {
        const answerList = current_stuff.stuff.questionAnswersComments.find((answer) => answer._id === event.target.id).answers;
        answerList.unshift(data);

        setCurrentStuff((prevState) => {
          return {
            ...prevState,
            stuff: {
              ...prevState.stuff,
              questionAnswersComments: prevState.stuff.questionAnswersComments.map((answer) => {
                if (answer._id === event.target.id) {
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

        event.target.parentNode.childNodes[1].value = "";

      }
    );

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
          <p>Owner: {current_stuff.stuff.owner.nickName}</p>
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
          <hr/>
          <div className="comments-content">
            <h2>Rating Comments</h2>
            <form>
                <label htmlFor="rating">Rate this stuff:</label>
                <br/>
                <select id="rating" name="rating" ref={ratingStarsOptions}>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </select>
                <br/><br/>
                <label htmlFor="comment">Write your comment here:</label>
                <br/>
                <textarea id="comment" name="comment" cols={80} rows={5} ref={ratingCommentInput}/>
                <br/>
                <button type="button" onClick={onClickRatingFormHandler}>Submit</button>
            </form>
            <div className="rating-comments">
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}>
                {current_stuff.stuff.ratingComments.length !== 0 ? current_stuff.stuff.ratingComments.map((ratingComment) => {
                  return (
                    <div style={
                      {
                        marginTop: "1rem",
                      }
                    } key={ratingComment._id}>
                      <Card>
                        <p>Rating: {ratingComment.rating}</p>
                        <p>Comment: {ratingComment.comment}</p>
                        <p>From: {ratingComment.from.name}</p>
                        <p>Created at: {ratingComment.createdAt}</p>
                        <hr/>
                      </Card>
                    </div>
                  )})
                : 
                  <h3>No rating comments yet</h3>
                }
              </div>
            </div>
            <hr/>
            <h2>Questions Comments</h2>
            <form>
              <label htmlFor="comment">Write your question here:</label>
              <br/>
              <textarea id="comment" name="comment" cols={80} rows={5} ref={questionInput}/>
              <br/>
              <button type="button" onClick={onClickQuestionFormHandler}>Submit</button>
            </form>
            <div className="questions-comments">
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}>
                {current_stuff.stuff.questionAnswersComments.length !== 0 ? current_stuff.stuff.questionAnswersComments.map((questionComment) => {
                  return (
                    <div style={
                      {
                        marginTop: "1rem",
                      }
                    } key={questionComment._id}>
                      <Card>
                        <p>Question: {questionComment.question}</p>
                        <p>From: {questionComment.from.name}</p>
                        <div>{questionComment.answers.map((answer) => {
                          return (
                            <div className="answer-content" key={answer._id}>
                              <p>Answer: {answer.body}</p>
                              <p>From: {answer.from.name}</p>
                            </div>
                          )
                        })}</div>
                        <div className="answer-form"
                        style={
                          {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }
                        }>
                          <p>Write answer:</p>
                          <textarea id="comment" name="comment" cols={50} rows={5}/>
                          <br/>
                          <button id={questionComment._id} type="button" onClick={onClickAnswerFormHandler}>Submit</button>
                        </div>
                        <hr/>
                      </Card>
                    </div>
                  )})
                :
                  <h3>No questions yet</h3>
                }
              </div>
            </div>
          </div>
        </>
    }
    </>;
};

export default DetailsPage;
