import React from "react";

import { Divider, Grid, Typography } from "@mui/material";

import classes from "./TitleWrapper.module.css";

const TitleWrapper = ({ title }) => {

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" style={{ fontWeight: "bold"}}>
                    {title}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            </Grid>
        </>
    );
};

export default TitleWrapper;