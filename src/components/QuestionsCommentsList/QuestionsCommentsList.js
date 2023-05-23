import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";

const QuestionsCommentsList = (props) => {
    const [text, setText] = useState('');

    return (
        <>
            <form
              onSubmit={props.onClickFormSubmit}
            >
              <FormControl required>
                <FormLabel>Your question</FormLabel>
                <Textarea
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
            <div className="questions-comments">
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}>
                {props.stuff.questionAnswersComments.length !== 0 ? props.stuff.questionAnswersComments.map((questionComment) => {
                  return (
                    <div style={
                      {
                        marginTop: "1rem",
                      }
                    } key={questionComment._id}>
                      <div>
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
                          <button id={questionComment._id} type="button" onClick={props.onClickAnswerSubmit}>Submit</button>
                        </div>
                        <hr/>
                      </div>
                    </div>
                  )})
                :
                  <h3>No questions yet</h3>
                }
              </div>
            </div>
        </>
    )
};

export default QuestionsCommentsList;