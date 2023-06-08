import React from "react";

import { Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import classes from "./LikeToggleBtn.module.css";

const LikeToggleBtn = ({ isLiked, onClick, isMine }) => {

    return (
        <>
            {
                !isMine && (
                    <Button variant="contained" color="error" className={classes.btn} startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={onClick}>
                        {isLiked ? "Unlike" : "Like"}
                    </Button>
                )
            }
        </>
    );
};

export default LikeToggleBtn;
