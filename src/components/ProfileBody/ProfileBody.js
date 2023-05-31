import { useNavigate } from "react-router-dom";
import { Button, Divider, Grid, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const ProfileBody = ({frontUser, isMe, onClickFollow}) => {
    const navigate = useNavigate(); 

    return (
        <>
            <Typography variant="h5" component="h5"
                style={{ fontWeight: "bold" }}
            >
                {frontUser.nickName}
            </Typography>
            <Typography variant="body1" component="p">
                {frontUser.name}
            </Typography>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            {
                isMe ? (
                <Grid item xs={12} container>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/edit-profile")}
                    >
                    Edit profile
                    </Button>
                </Grid>
                ) : (
                <Grid item xs={12} container>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickFollow}
                        startIcon={frontUser.isFollowing ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />}
                    >
                        {frontUser.isFollowing ? "Stop following" : "Follow"}
                    </Button>
                </Grid>
                )
            }
        </>
    );
};

export default ProfileBody;