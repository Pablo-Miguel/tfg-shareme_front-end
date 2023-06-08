import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

import LikeToggleBtn from "../UIs/LikeToggleBtn/LikeToggleBtn";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import classes from "./StuffBodyDetail.module.css";

const StuffBodyDetail = ({current_stuff, user, onLike, onDelete}) => {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);

    const onEditClickHandler = () => {
        navigate(`/edit-stuff/${current_stuff.stuff._id}`);
    }

    const onDeleteClickHandler = () => {
        setOpenModal(true);
    }

    const navigateHandler = () => {
        navigate(`/profile/${current_stuff.stuff.owner._id}`);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }} className={classes.box}>
                <Grid item xs={12} container className={`${classes.container} ${classes.avatarGrid}`} onClick={navigateHandler}>
                    <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                        className={classes.avatar}
                    />
                    <Typography variant="p" component="p">
                        {current_stuff.stuff.owner.nickName}
                    </Typography>
                </Grid>

                <Typography variant="h6" component="h6"
                    className={classes.category}
                >
                    <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
                </Typography>
            </Box>

            <Divider className={classes.container}/>
            
            <Typography variant="h5" component="h5"
                className={classes.title}
            >
                {current_stuff.stuff.title}
            </Typography>
            <Typography variant="body1" component="p">
                {current_stuff.stuff.description}
            </Typography>

            <Divider className={classes.container}/>

            {
                current_stuff.stuff.has_offer ? (
                <Grid item xs={6} container>
                    <div>
                        <Typography variant="h6" component="h6" color="grey"
                            className={`${classes.text} ${classes.lineThroughPrice}`}
                        >
                            <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                        </Typography>
                        <Typography variant="h5" component="h5" color="green"
                            className={`${classes.text} ${classes.boldPrice}`}
                        >
                            <LocalOfferRoundedIcon /> {current_stuff.stuff.offer_price}€
                        </Typography>
                    </div>
                    <div className={classes.percent}>
                        <Typography variant="h5" component="h5" color="error"
                            className={`${classes.text} ${classes.boldPrice}`}
                        >
                            {Math.round(((current_stuff.stuff.price - current_stuff.stuff.offer_price) / current_stuff.stuff.price) * 100)} <PercentRoundedIcon />
                        </Typography>
                    </div>
                </Grid>
                ) : (
                <Typography variant="h6" component="h6"
                    className={classes.text}
                >
                    <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                </Typography>
                )
            }
            
            <Button variant="contained" color="secondary" className={classes.buttonContainer} startIcon={<ShoppingCartOutlinedIcon />} endIcon={<OpenInNewRoundedIcon />}>
                <Typography variant="p" component="a" href={current_stuff.stuff.shopping_link}  target="_blank" rel="noopener noreferrer" className={classes.link}>Shopping link</Typography>
            </Button>

            <Divider className={classes.container}/>

            <LikeToggleBtn isLiked={current_stuff.isLiked} onClick={onLike} isMine={current_stuff.stuff.owner._id === user._id} />

            {
                current_stuff.stuff.owner._id === user._id && (
                    <div>
                        <Button onClick={onEditClickHandler} variant="contained" color="primary" className={classes.btn} startIcon={<EditRoundedIcon />}>
                            <Typography variant="p" component="p" className={classes.link}>Edit</Typography>
                        </Button>
                        <Button onClick={onDeleteClickHandler} variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
                            <Typography variant="p" component="p" className={classes.link}>Delete</Typography>
                        </Button>
                    </div>
                )
            }

            <DeleteConfirmationModal open={openModal} setOpen={setOpenModal} type='stuff' onDelete={onDelete} />
        </>
    );
};

export default StuffBodyDetail;