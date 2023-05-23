import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Rating } from "@mui/material";

const RatingCommentsList = (props) => {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');

    return (
        <>
          <form
            onSubmit={props.onClickSubmit}
          >
            <FormControl required>
            <FormLabel>Rating</FormLabel>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            </FormControl>
            <FormControl required>
              <FormLabel>Your comment</FormLabel>
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
          <div className="rating-comments">
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}>
              {props.stuff.ratingComments.length !== 0 ? props.stuff.ratingComments.map((ratingComment) => {
                return (
                  <div style={
                    {
                      marginTop: "1rem",
                    }
                  } key={ratingComment._id}>
                    <div>
                      <p>Rating: {ratingComment.rating}</p>
                      <p>Comment: {ratingComment.comment}</p>
                      <p>From: {ratingComment.from.name}</p>
                      <p>Created at: {ratingComment.createdAt}</p>
                      <hr/>
                    </div>
                  </div>
                )})
              : 
                <h3>No rating comments yet</h3>
              }
            </div>
          </div>
        </>
    )
};

export default RatingCommentsList;