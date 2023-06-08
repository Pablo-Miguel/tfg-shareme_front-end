import React from "react";

import { Pagination } from "@mui/material";

import classes from "./PaginationUI.module.css";

const PaginationUI = (props) => {

    return (
        <Pagination
            count={props.count}
            page={props.page}
            onChange={props.onChange}
            className={classes.pagination}
            color="primary"
            size="large"
        />
    );
};

export default PaginationUI;