import React from 'react';

import Backdrop from '@mui/material/Backdrop';

import Spinner from '../Spinner/Spinner';

import classes from './SimpleBackdrop.module.css';

const SimpleBackdrop = props => {

    return (
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        className={classes.backdrop}
        open={true}
      >
        <Spinner color="inherit" />
      </Backdrop>
    )
};

export default SimpleBackdrop;