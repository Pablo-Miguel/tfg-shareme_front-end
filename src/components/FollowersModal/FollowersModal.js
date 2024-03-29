import React, { useEffect, useState } from 'react';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Typography from '@mui/joy/Typography';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Grid } from '@mui/material';

import useHttp from '../../hooks/useHttp';
import Spinner from '../Spinner/Spinner';
import { getAuthToken } from '../../utils/storage';
import ProfileCard from '../ProfileCard/ProfileCard';
import FormButton from '../UIs/FormButton/FormButton';

import classes from './FollowersModal.module.css';


import { LIMIT } from "../../Global";

const FollowersModal = ({ title, open, setOpen, type, userId, setType }) => {
    const { error, isLoading, sendRequest: fetchFollowers } = useHttp();
    const [ followers, setFollowers ] = useState([]);
    const [ viewMoreCont, setViewMoreCont ] = useState(0);
    const [ viewMore, setViewMore ] = useState(false);

    const fetchData = (viewMoreContProp) => {
        let urlBase = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${userId}/`;

        if(type === 'followers') {
            urlBase += 'followers?';
        } else if(type === 'following') {
            urlBase += 'following?';
        }
        
        urlBase += `limit=${(viewMoreContProp * LIMIT) + LIMIT}`;

        fetchFollowers({
            url: urlBase,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }, (data) => {
            if(data.followers) {
                setFollowers(data.followers);
            } else if(data.following) {
                setFollowers(data.following);
            }
            
            setViewMore(data.total <= (viewMoreContProp + 1) * LIMIT);
        });
    };

    useEffect(() => {

        if(type){
            setFollowers([]);
            setViewMoreCont(0);
            setViewMore(false);
            fetchData(0);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const onClickProfileHandler = () => {
        setOpen(false);
    };

    const onClickViewMoreHandler = () => {
        
        setViewMoreCont(viewMoreCont + 1);
        fetchData(viewMoreCont + 1);
        
    };

    const onCloseHandler = () => {
        setType('');
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={onCloseHandler}>
            <ModalOverflow>
                <ModalDialog aria-labelledby="modal-dialog-overflow" layout='center'>
                    <ModalClose />
                    <Typography id="modal-dialog-overflow" component="h2" className={classes.title}>
                        {title}
                    </Typography>
                    {
                        followers.length > 0 && !isLoading && !error && (
                            <>
                                    <Grid container>
                                            {followers.map((item) => (
                                                <Grid item xs={12} md={6} key={item._id} className={classes.cardsContent}>
                                                    <ProfileCard user={item} onClick={onClickProfileHandler} />
                                                </Grid>
                                            ))}
                                    </Grid>
                                    {!viewMore && 
                                        <FormButton
                                            variant="soft"
                                            type="button"
                                            text="View more"
                                            isLoading={isLoading}
                                            loadingPosition="start"
                                            fullWidth={true}
                                            startDecorator={<RemoveRedEyeRoundedIcon />}
                                            onClick={onClickViewMoreHandler}
                                        />    

                                    }
                            </>
                        )
                    }
                    {
                        isLoading && !error && (
                            <Spinner />
                        )
                    }
                    {
                        followers.length === 0 && !isLoading && !error && (
                            <Typography component="p">
                                No {type} yet.
                            </Typography>
                        )
                    }
                </ModalDialog>
            </ModalOverflow>
        </Modal>
    );
};

export default FollowersModal;