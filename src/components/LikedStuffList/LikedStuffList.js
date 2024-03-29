import React, { useState } from 'react';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Grid, Typography } from '@mui/material';

import FormButton from '../UIs/FormButton/FormButton';
import { getAuthToken } from '../../utils/storage';
import useHttp from '../../hooks/useHttp';
import StuffCard from '../StuffCard/StuffCard';

import classes from './LikedStuffList.module.css';

const LikedStuffList = ({ likedStuff }) => {
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(likedStuff.total <= (viewMoreCont + 1) * 10);
    const [ stuff, setStuff ] = useState(likedStuff.stuff);
    const { isLoading, sendRequest: fetchMoreStuff } = useHttp();

    const viewMoreHandler = () => {
        
        fetchMoreStuff({
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/users/me/likedStuff?skip=${(viewMoreCont + 1) * 10}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            }
        }, (data) => {

            setStuff((prevState) => {
                return prevState.concat(data.stuff);
            });
            
            setViewMore(data.total <= (viewMoreCont + 2) * 10);
            setViewMoreCont((prevState) => prevState + 1);
        });

    };

    return (
        <>
            { stuff.length > 0 && 
                <Grid container>
                    {stuff.map((item) => (
                        <Grid item container xs={12} md={6} lg={6} key={item._id} className={classes.content}>
                            <StuffCard
                                id={item._id}
                                stuff={item}
                                isMine={false}
                            />
                        </Grid>
                    ))}
                    { !viewMore && 
                        <FormButton
                            text="View more"
                            isLoading={isLoading}
                            loadingPosition="start"
                            fullWidth={true}
                            startDecorator={<RemoveRedEyeRoundedIcon />}
                            onClick={viewMoreHandler}
                        />
                    }
                </Grid>
            }
            { stuff.length <= 0 &&
                <Grid item xs={12} container className={classes.content}>
                    <Typography variant="h5" component="h5" className={classes.text}>
                        No liked stuff!
                    </Typography>
                </Grid>
            }
        </>
    );
};

export default LikedStuffList;