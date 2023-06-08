import React from 'react';

import { IconButton } from "@mui/joy";
import FavoriteIcon from '@mui/icons-material/Favorite';

import classes from "./FavoriteIconBtn.module.css";

const FavoriteIconBtn = ({ isLiked, onClick, isMine }) => {

    return (
        <>
          {
            !isMine && (
              <IconButton
                size="md"
                variant="solid"
                color={isLiked ? "" : "danger"}
                sx={{
                  backgroundColor: isLiked ? "background.level2" : "",
                  border: isLiked ? "2px solid #D7D7D7" : ""
                }}
                className={classes.btn}
                onClick={onClick}
              >
                <FavoriteIcon color={isLiked ? "error": ""} />
              </IconButton>
            )
          }
        </>
    );
}

export default FavoriteIconBtn;