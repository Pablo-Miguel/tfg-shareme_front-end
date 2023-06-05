import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import LikeToggleBtn from '../UIs/LikeToggleBtn/LikeToggleBtn';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

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
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }} flexDirection="column">
                <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                    <Avatar src={collection.owner.avatar} alt={collection.owner.name} 
                        style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    <Typography variant="p" component="p">
                        {collection.owner.nickName}
                    </Typography>
                </Grid>
            </Box>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            
            <Typography variant="h5" component="h5"
                style={{ fontWeight: "bold" }}
            >
                {collection.title}
            </Typography>
            <Typography variant="body1" component="p">
                {collection.description}
            </Typography>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            <LikeToggleBtn isLiked={collection.isLiked} onClick={onLike} isMine={collection.owner._id === user._id} />

            {
                collection.owner._id === user._id && (
                <div>
                    <Button onClick={onEditClickHandler} variant="contained" color="primary" style={{ marginRight: 20 }} startIcon={<EditRoundedIcon />}>
                        <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Edit</Typography>
                    </Button>
                    <Button onClick={onDeleteClickHandler} variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
                        <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Delete</Typography>
                    </Button>
                </div>
                )
            }

            <DeleteConfirmationModal open={openModal} setOpen={setOpenModal} type='stuff' onDelete={onDelete} />
        </>
    );
};

export default CollectionBodyDetail;