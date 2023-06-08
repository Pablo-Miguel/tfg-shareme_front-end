import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import { Grid } from "@mui/material";

import CreateStuffForm from "../components/CreateStuffForm/CreateStuffForm";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import Alert from "../components/Alert/Alert";
import TitleWrapper from "../components/UIs/TitleWrapper.js/TitleWrapper";

const EditStuffPage = (props) => {
    const loader = useRouteLoaderData("edit-stuff");
    const { error, isLoading, sendRequest: fetchEditStuff } = useHttp();
    const { error: imageError, sendRequest: editImageToStuff } = useHttp();
    const [open, setOpen] = useState(false);

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

    const sendStuffHandler = (event) => {
    
        fetchEditStuff(
            {
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${loader.stuff._id}`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                "Content-Type": "application/json",
            },
            body: {
                title: event.data.title,
                description: event.data.description,
                price: event.data.price,
                category: event.data.category,
                shopping_link: event.data.shopping_link,
                has_offer: event.data.has_offer,
                offer_price: event.data.offer_price,
            },
            },
            (data) => {
                if(event.data.image) {
                    changeImageHandler(data._id, event.data.image);
                } else {
                    setOpen(true);
                }
            
            }
        );

    };

    const changeImageHandler = (id, image) => {
    
        const formData = new FormData();
        formData.append('image', image, image.name);

        editImageToStuff(
            {
                url: `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/${id}/image`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                },
                body: formData,
            },
            (data) => {
                setOpen(true);
            }
        );
    
    };

    return (
        <>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8} container>

                    <TitleWrapper title="Edit stuff" />

                    <Grid item xs={12}>
                        <CreateStuffForm initialStuff={loader.stuff} onSubmit={sendStuffHandler} isLoading={isLoading} />
                    </Grid>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            {open && !error && !imageError ? (
                <Alert severity="success" open={open} handleClose={handleClose} message="Your stuff has been updated successfully!" />
            )
            : (
                <Alert severity="error" open={open} handleClose={handleClose} message={error ? error : imageError} />
            )}
        </>
    );
};

export default EditStuffPage;