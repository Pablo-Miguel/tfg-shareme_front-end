import React from 'react';

import { useNavigate } from 'react-router-dom';
import { AspectRatio, Card, CardContent, CardOverflow, Divider, Typography } from '@mui/joy';

import classes from './ProfileCard.module.css';

const ProfileCard = ({ user, onClick }) => {
    const navigate = useNavigate();

    const onClickProfileHandler = () => {
        if(onClick){
            onClick();
        }
        navigate(`/profile/${user._id}`);
    }

    return (
        <Card
            orientation="horizontal"
            variant="outlined"
            className={classes.card}
            onClick={onClickProfileHandler}
        >
            <CardOverflow>
                <AspectRatio ratio="1" className={classes.avatar}>
                    <img
                        src={user.avatar}
                        srcSet={`${user.avatar} 2x`}
                        loading="lazy"
                        alt={user.nickName}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.nickName}>
                    {user.nickName}
                </Typography>
                <Typography level="body2">
                    {user.name}
                </Typography>
            </CardContent>

            { user.verified &&
                <Divider />
            }
            { user.verified &&
                <CardOverflow
                    variant="soft"
                    color="primary"
                    className={classes.verified}
                >
                    Verified
                </CardOverflow>
            }
        </Card>
    );
};

export default ProfileCard;