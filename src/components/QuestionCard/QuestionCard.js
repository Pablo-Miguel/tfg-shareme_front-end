import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AspectRatio, Box, Button, Card, CardContent, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import { Avatar, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
            sx={{
                width: 'calc(100% - 35px)',
                gap: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={4} sm={3} padding={1} onClick={() => {navigateHandler(question.from.id)}}>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                            src={question.from.avatar}
                            srcSet={question.from.avatar}
                            loading="lazy"
                            alt={question.from.nickName}
                        />
                    </AspectRatio>
                </Grid>
                <Grid item xs={8} sm={9}>
                    <Grid container alignItems="center" justifyContent="space-between" onClick={() => {navigateHandler(question.from.id)}}>
                        <Typography level="h6" aria-describedby="card-description" mb={1}>
                            {question.from.nickName}
                        </Typography>
                    </Grid>
                    <Typography 
                        level="h5" 
                        id="card-description"
                        mb={0.5}
                        sx={{
                            wordWrap: 'break-word',
                            hyphens: 'auto',
                        }}
                    >
                        {question.question}
                    </Typography>
                </Grid>

                <Grid item xs={12} alignItems="center">
                    <Divider />
                </Grid>
                
                <Grid item container xs={12} alignItems="center">
                    <Typography level="body2" sx={{ color: 'text.secondary' }}>
                        See answer(s)
                    </Typography>
                    <IconButton
                        onClick={handleSeeAnswersExpandClick}
                        aria-expanded={seeAnswersExpanded}
                        aria-label="show more"
                        style={{ marginLeft: 'auto' }}
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
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar onClick={() => {navigateHandler(answer.from.id)}}>
                                                    <Avatar alt={answer.from.nickName} src={answer.from.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={answer.from.nickName}
                                                    secondary={
                                                        <Grid container alignItems="center">
                                                            <Typography
                                                                level="body1"
                                                                id="card-description"
                                                                mb={0.5}
                                                                sx={{
                                                                    wordWrap: 'break-word',
                                                                    hyphens: 'auto',
                                                                }}
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
                                        <Typography level="body1" sx={{ color: 'text.secondary', textAlign: "center" }}>
                                            No answers yet
                                        </Typography>
                                    )
                                }
                            </List>
                        </CardContent>
                    </Collapse>
                </Grid>

                <Grid item xs={12} alignItems="center">
                    <Divider />
                </Grid>

                <Grid item container xs={12} alignItems="center">
                    <Typography level="body2" sx={{ color: 'text.secondary' }}>
                        {question.answers.length} answer(s)
                    </Typography>
                    <IconButton
                        onClick={handleAnswerFormExpandClick}
                        aria-expanded={answerFormExpanded}
                        aria-label="show more"
                        style={{ marginLeft: 'auto' }}
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
                        </CardContent>
                    </Collapse>
                </Grid>
            </Grid>
        </Card>
    );
}

export default QuestionCard;