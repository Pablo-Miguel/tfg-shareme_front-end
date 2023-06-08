import React from "react";

import { Divider, Grid, Typography } from "@mui/material";

import classes from "./TitleWrapper.module.css";

const TitleWrapper = ({ title }) => {

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" className={classes.text}>
                    {title}
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.divider}>
                <Divider />
            </Grid>
        </>
    );
};

export default TitleWrapper;