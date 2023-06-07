import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AspectRatio, Box, Button, Card, CardContent, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Avatar, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import classes from "./QuestionCard.module.css";

const QuestionCard = ({ question, onSubmitHandler: submitHandler }) => {
    const navigate = useNavigate();
    const [answerFormExpanded, setAnswerFormExpanded] = useState(false);
    const [seeAnswersExpanded, setSeeAnswersExpanded] = useState(false);
    const [text, setText] = useState('');

    const handleAnswerFormExpandClick = () => {
        setAnswerFormExpanded(!answerFormExpanded);
    };

    const handleSeeAnswersExpandClick = () => {
        setSeeAnswersExpanded(!seeAnswersExpanded);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formElements = event.currentTarget.elements;
        const data = {
            questionId: question._id,
            answer: formElements.answer.value
        };

        submitHandler({
            data: data,
            setText: setText
        });
    };

    const navigateHandler = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            className={classes.card}
        >
            <Grid container className={classes.container}>
                <Grid item xs={4} lg={3} className={classes.avatarContainer} onClick={() => {navigateHandler(question.from.id)}}>
                    <AspectRatio ratio="1" className={classes.avatar}>
                        <img
                            src={question.from.avatar}
                            srcSet={question.from.avatar}
                            loading="lazy"
                            alt={question.from.nickName}
                        />
                    </AspectRatio>
                </Grid>
                <Grid item xs={8} lg={9}>
                    <Grid container className={classes.container} onClick={() => {navigateHandler(question.from.id)}}>
                        <Typography level="h6" aria-describedby="card-description" className={classes.nickName}>
                            {question.from.nickName}
                        </Typography>
                    </Grid>
                    <Typography 
                        level="h5" 
                        id="card-description"
                        className={classes.question}
                    >
                        {question.question}
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.gridContainer}>
                    <Divider />
                </Grid>
                
                <Grid item container xs={12} className={classes.gridContainer}>
                    <Typography level="body2" className={classes.seeAnswerTxt}>
                        See answer(s)
                    </Typography>
                    <IconButton
                        onClick={handleSeeAnswersExpandClick}
                        aria-expanded={seeAnswersExpanded}
                        aria-label="show more"
                        className={classes.iconButton}
                    >
                        {seeAnswersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={seeAnswersExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <List>
                                {
                                    question.answers.length > 0 ? question.answers.map((answer, index) => (
                                        <div key={answer._id}>
                                            <ListItem>
                                                <ListItemAvatar onClick={() => {navigateHandler(answer.from.id)}}>
                                                    <Avatar alt={answer.from.nickName} src={answer.from.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={answer.from.nickName}
                                                    secondary={
                                                        <Grid container className={classes.gridContainer}>
                                                            <Typography
                                                                level="body1"
                                                                id="card-description"
                                                                className={classes.question}
                                                            >
                                                                {answer.body}
                                                            </Typography>
                                                        </Grid>
                                                    }
                                                    onClick={() => {navigateHandler(answer.from.id)}}
                                                />
                                            </ListItem>
                                            {
                                                index !== question.answers.length - 1 && (
                                                    <Divider variant="inset" component="li" />
                                                )
                                            }
                                        </div>
                                    )) : (
                                        <Typography level="body1" className={classes.noAnswerText}>
                                            No answers yet
                                        </Typography>
                                    )
                                }
                            </List>
                        </CardContent>
                    </Collapse>
                </Grid>

                <Grid item xs={12} className={classes.gridContainer}>
                    <Divider />
                </Grid>

                <Grid item container xs={12} className={classes.gridContainer}>
                    <Typography level="body2" className={classes.seeAnswerTxt}>
                        {question.answers.length} answer(s)
                    </Typography>
                    <IconButton
                        onClick={handleAnswerFormExpandClick}
                        aria-expanded={answerFormExpanded}
                        aria-label="show more"
                        className={classes.iconButton}
                    >
                        {answerFormExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={answerFormExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <form
                                onSubmit={onSubmitHandler}
                            >
                                <FormControl required>
                                    <FormLabel>Your answer</FormLabel>
                                    <Textarea
                                        name="answer"
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
                        </CardContent>
                    </Collapse>
                </Grid>
            </Grid>
        </Card>
    );
}

export default QuestionCard;