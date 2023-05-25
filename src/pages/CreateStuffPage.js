import React, { useEffect, useRef, useState } from "react";

import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/storage";
import { Divider, Grid, Typography as TypographyMUI } from "@mui/material";


import Alert from "../components/Alert/Alert";
import CreateStuffForm from "../components/CreateStuffForm/CreateStuffForm";

const AddStuffPage = () => {
  const { isLoading, error, sendRequest: sendNewStuff } = useHttp();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error && error !== '') {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  };

  const sendStuffHandler = (event) => {
    
    sendNewStuff(
      {
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/stuff/add-new-stuff`,
        method: "POST",
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
        event.clearForm();
        
        setOpen(true);
      }
    );

  };

  return (
    <>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={0} md={1} lg={2}></Grid>
        <Grid item xs={12} md={10} lg={8} container>
          <Grid item xs={12}>
            <TypographyMUI variant="h4" component="h4" style={{ fontWeight: "bold"}}>
              Create new stuff
            </TypographyMUI>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Grid>

          <Grid item xs={12}>
            <CreateStuffForm onSubmit={sendStuffHandler} isLoading={isLoading} />
          </Grid>
        </Grid>
        <Grid item xs={0} md={1} lg={2}></Grid>
      </Grid>
      {open & !error ? (
        <Alert severity="success" open={open} handleClose={handleClose} message="Your stuff has been created successfully!" />
      )
      : (
        <Alert severity="error" open={open} handleClose={handleClose} message={error} />
      )}
    </>
  );
};

export default AddStuffPage;
