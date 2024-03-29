import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import ProfileForm from "../components/ProfileForm/ProfileForm";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Alert from "../components/Alert/Alert";
import { authActions } from "../store/auth-store/auth-slice";
import TitleWrapper from "../components/UIs/TitleWrapper.js/TitleWrapper";


const EditProfile = () => {
    const { isLoading, error, sendRequest: fetchEditProfile } = useHttp();
    const { error: imageError, sendRequest: editImageToProfile } = useHttp();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error && error !== '') {
            setOpen(true);
        }

        if (imageError && imageError !== '') {
            setOpen(true);
        }
    }, [error, imageError]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        
        setOpen(false);
    };

    const onSubmitProfileHandler = (event) => {
        
        let initialBody = {};

        if(event.data.password) {
            initialBody = {
                firstName: event.data.firstName,
                lastName: event.data.lastName,
                nickName: event.data.nickName,
                verified: event.data.verified,
                email: event.data.email,
                password: event.data.password,
            };
        } else {
            initialBody = {
                firstName: event.data.firstName,
                lastName: event.data.lastName,
                nickName: event.data.nickName,
                verified: event.data.verified,
                email: event.data.email,
            };
        }

        fetchEditProfile(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/users/me`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    "Content-Type": "application/json",
                },
                body: initialBody,
            },
            (data) => {

                dispatch(authActions.setVerified(event.data.verified));

                if(event.data.avatar) {
                    changeImageHandler(event.data.avatar);
                } else {
                    setOpen(true);
                }
                
            }
        );

    };

    const changeImageHandler = (avatar) => {
        
        const formData = new FormData();
        formData.append('image', avatar, avatar.name);

        editImageToProfile(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/users/me/avatar`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                },
                body: formData,
            },
            (data) => {
                console.log(data);
                dispatch(authActions.setAvatar(data));
                setOpen(true);
            }
        );
        
    };

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>

                    <TitleWrapper title="Edit profile" />

                    <Grid item xs={12}>
                        <ProfileForm onSubmit={onSubmitProfileHandler} isLoading={isLoading} />
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            {open & !error & !imageError ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Profile correctly edited!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error ? error : imageError} />
            )}
        </>
    )
};

export default EditProfile;