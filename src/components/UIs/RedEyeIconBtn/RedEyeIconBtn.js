import React from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton } from '@mui/joy';

import classes from './RedEyeIconBtn.module.css';

const RedEyeIconBtn = (props) => {

    return (
        <IconButton
            size="md"
            variant="solid"
            color="info"
            className={classes.btn}
            onClick={props.onClick}
        >
            <RemoveRedEyeIcon />
        </IconButton>
    );
}

export default RedEyeIconBtn;