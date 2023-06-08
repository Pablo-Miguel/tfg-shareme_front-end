import React from 'react';

import { Avatar, Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import classes from './StuffHeaderBodyDetail.module.css';

const StuffHeaderBodyDetail = ({ current_stuff }) => {

    return (
        <>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }}} className={classes.box}>
              <Grid item xs={12} container className={classes.contentSpace}>
                <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                  className={classes.avatar}
                />
                <Typography variant="p" component="p">
                  {current_stuff.stuff.owner.nickName}
                </Typography>
              </Grid>

              <Typography variant="h6" component="h6"
                className={classes.infoDetails}
              >
                <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
              </Typography>
            </Box>
            <Grid item xs={12} container className={classes.container}>
              <img src={current_stuff.stuff.image} alt="stuff_image" className={classes.image} />
            </Grid>
            <Grid item xs={12} padding={2} container>
              <Grid item xs={6} container className={classes.container}>
                <Typography variant="p" component="p"
                  className={classes.infoDetails}
                >
                  <RemoveRedEyeIcon color="secondary" /> {current_stuff.stuff.views}
                </Typography>
              </Grid>
              <Grid item xs={6} container className={classes.container}>
                <Typography variant="p" component="p"
                  className={classes.infoDetails}
                >
                  <FavoriteIcon color="error" /> {current_stuff.stuff.likes}
                </Typography>
              </Grid>
            </Grid>
        </>
    );
};

export default StuffHeaderBodyDetail;