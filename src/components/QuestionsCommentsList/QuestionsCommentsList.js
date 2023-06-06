import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Grid } from "@mui/material";
import QuestionCard from "../QuestionCard/QuestionCard";

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
                      sx={{
                        display: 'flex',
                        gap: 'var(--Textarea-paddingBlock)',
                        pt: 'var(--Textarea-paddingBlock)',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        flex: 'auto',
                      }}
                    >
                      <Typography level="body3">
                        {text.length} character(s)
                      </Typography>
                      <Button type="submit" sx={{ ml: 'auto' }} >Comment</Button>
                    </Box>
                  }
                  sx={{
                    minWidth: 300
                  }}
                />
              </FormControl>
            </form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography  level="h5" variant="h6" sx={{ mt: 4 }}>Questions ({props.stuff.questionAnswersComments.length})</Typography>
              </Grid>
              <Grid item container xs={12}>
                {props.stuff.questionAnswersComments.length !== 0 ? props.stuff.questionAnswersComments.map((questionComment) => {
                  return (
                    <Grid item xs={12} md={6} container justifyContent="center" key={questionComment._id} style={{ padding: 10 }}>
                      <QuestionCard question={questionComment} onSubmitHandler={props.onClickAnswerSubmit} />
                    </Grid>
                  )
                }) : (
                  <Grid item container justifyContent="center">
                    <Typography level="h4" variant="h6" sx={{ mt: 4}}>No questions yet</Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
        </>
    )
};

export default QuestionsCommentsList;