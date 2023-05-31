import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AspectRatio, Card, CardContent, CardOverflow, Divider, Typography } from '@mui/joy';

const ProfileCard = ({ user }) => {
    const navigate = useNavigate();

    const onClickProfileHandler = () => {
        navigate(`/profile/${user._id}`);
    }

    return (
        <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: '100%', bgcolor: 'background.body', margin: '10px' }}
            onClick={onClickProfileHandler}
        >
            <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={user.avatar}
                        srcSet={`${user.avatar} 2x`}
                        loading="lazy"
                        alt={user.nickName}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ px: 2 }}>
                <Typography fontWeight="md" textColor="primary.plainColor" mb={0.5}>
                    {user.nickName}
                </Typography>
                <Typography level="body2">
                    {user.name}
                </Typography>
            </CardContent>
            <Divider />
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs2',
                    fontWeight: 'xl2',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                }}
            >
                Verified
            </CardOverflow>
        </Card>
    );
};

export default ProfileCard;