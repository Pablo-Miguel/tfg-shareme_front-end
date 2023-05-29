import React from 'react';
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import LikeToggleBtn from '../UIs/LikeToggleBtn/LikeToggleBtn';

const CollectionBodyDetail = ({ collection, user, onLike }) => {

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
                    <Button variant="contained" color="primary" style={{ marginRight: 20 }} startIcon={<EditRoundedIcon />}>
                        <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Edit</Typography>
                    </Button>
                    <Button variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
                        <Typography variant="p" component="p" style={{ textDecoration: "none", color: "white" }}>Delete</Typography>
                    </Button>
                </div>
                )
            }
        </>
    );
};

export default CollectionBodyDetail;