import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import LikeToggleBtn from '../UIs/LikeToggleBtn/LikeToggleBtn';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

import classes from './CollectionBodyDetail.module.css';

const CollectionBodyDetail = ({ collection, user, onLike, onDelete }) => {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);

    const onEditClickHandler = () => {
        navigate(`/edit-collection/${collection._id}`);
    }

    const onDeleteClickHandler = () => {
        setOpenModal(true);
    }

    return (
        <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }} className={classes.boxContainer}>
                <Grid item xs={12} container className={classes.contentSpace}>
                    <Avatar src={collection.owner.avatar} alt={collection.owner.name} 
                        className={classes.avatar}
                    />
                    <Typography variant="p" component="p">
                        {collection.owner.nickName}
                    </Typography>
                </Grid>
            </Box>

            <Divider className={classes.contentSpace}/>
            
            <Typography variant="h5" component="h5"
                className={classes.title}
            >
                {collection.title}
            </Typography>
            <Typography variant="body1" component="p">
                {collection.description}
            </Typography>

            <Divider className={classes.contentSpace}/>

            <LikeToggleBtn isLiked={collection.isLiked} onClick={onLike} isMine={collection.owner._id === user._id} />

            {
                collection.owner._id === user._id && (
                <div>
                    <Button onClick={onEditClickHandler} variant="contained" color="primary" className={classes.buttonContent} startIcon={<EditRoundedIcon />}>
                        <Typography variant="p" component="p" className={classes.buttonTextDecoration}>Edit</Typography>
                    </Button>
                    <Button onClick={onDeleteClickHandler} variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
                        <Typography variant="p" component="p" className={classes.buttonTextDecoration}>Delete</Typography>
                    </Button>
                </div>
                )
            }

            <DeleteConfirmationModal open={openModal} setOpen={setOpenModal} type='stuff' onDelete={onDelete} />
        </>
    );
};

export default CollectionBodyDetail;