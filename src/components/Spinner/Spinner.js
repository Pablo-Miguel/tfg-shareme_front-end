import React from "react";

import { CircularProgress } from "@mui/joy";

import classes from "./Spinner.module.css";

const Spinner = () => {
    return (
        <div
            className={classes.spinner}
        >
            <CircularProgress />
            <p>Loading...</p>
        </div>
    );
}

export default Spinner;