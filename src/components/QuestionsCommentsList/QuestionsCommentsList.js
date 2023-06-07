import React, { useState } from "react";

import { Box, Button, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Grid } from "@mui/material";

import QuestionCard from "../QuestionCard/QuestionCard";

import classes from "./QuestionsCommentsList.module.css";

const QuestionsCommentsList = (props) => {
    const [text, setText] = useState('');

    const onSubmitHandler = (event) => {
      event.preventDefault();

      const formElements = event.currentTarget.elements;
      const data = {
        question: formElements.question.value
      };

      props.onClickFormSubmit({
        data: data,
        setText: setText
      });
    };

    return (
        <>
            <form
              onSubmit={onSubmitHandler}
            >
              <FormControl required>
                <FormLabel>Your question</FormLabel>
                <Textarea
                  name="question"
                  placeholder="Type something here…"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  minRows={3}
                  endDecorator={
                    <Box
                      className={classes.box}
                    >
                      <Typography level="body3">
                        {text.length} character(s)
                      </Typography>
                      <Button type="submit" className={classes.commentBtn} >Comment</Button>
                    </Box>
                  }
                  className={classes.textArea}
                />
              </FormControl>
            </form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography  level="h5" variant="h6" className={classes.text}>Questions ({props.stuff.questionAnswersComments.length})</Typography>
              </Grid>
              <Grid item container xs={12}>
                {props.stuff.questionAnswersComments.length !== 0 ? props.stuff.questionAnswersComments.map((questionComment) => {
                  return (
                    <Grid item xs={12} md={6} container className={classes.container} key={questionComment._id} style={{ padding: 10 }}>
                      <QuestionCard question={questionComment} onSubmitHandler={props.onClickAnswerSubmit} />
                    </Grid>
                  )
                }) : (
                  <Grid item container className={classes.container}>
                    <Typography level="h4" variant="h6" className={classes.text}>No questions yet</Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
        </>
    )
};

export default QuestionsCommentsList;