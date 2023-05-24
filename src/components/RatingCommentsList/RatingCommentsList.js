import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Grid, Rating } from "@mui/material";
import RatingCard from "../RatingCard/RatingCard";

const RatingCommentsList = (props) => {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formElements = event.currentTarget.elements;

        const data = {
          rating: formElements.rating.value,
          comment: formElements.comment.value
        };

        props.onClickSubmit({
          data: data,
          setValue: setValue,
          setText: setText
        });
    };

    return (
        <>
          <form
            onSubmit={onSubmitHandler}
          >
            <FormControl required>
            <FormLabel>Rating</FormLabel>
            <Rating
              name="rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            </FormControl>
            <FormControl>
              <FormLabel>Your comment</FormLabel>
              <Textarea
                name="comment"
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
              <Typography level="h5" variant="h6" sx={{ mt: 4 }}>Comments ({props.stuff.ratingComments.length})</Typography>
            </Grid>
            <Grid item container xs={12}>
              {
                props.stuff.ratingComments.length !== 0 ? props.stuff.ratingComments.map((ratingComment) => {
                  return (
                    <Grid item xs={12} md={6} container justifyContent="center" key={ratingComment._id} style={{ padding: 10 }}>
                      <RatingCard rating={ratingComment.rating} comment={ratingComment.comment} from={ratingComment.from} userId={props.userId} />
                    </Grid>
                  )}
                ) : (
                  <Grid item container justifyContent="center">
                    <Typography level="h4" variant="h6" sx={{ mt: 4}}>No comments yet</Typography>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </>
    )
};

export default RatingCommentsList;