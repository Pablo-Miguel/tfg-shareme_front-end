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

const StuffBodyDetail = ({current_stuff, user, onLike}) => {
    return (
        <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }} flexDirection="column">
                <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                    style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Typography variant="p" component="p">
                    {current_stuff.stuff.owner.nickName}
                </Typography>
                </Grid>

                <Typography variant="h6" component="h6"
                style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
                >
                <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
                </Typography>
            </Box>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
            
            <Typography variant="h5" component="h5"
                style={{ fontWeight: "bold" }}
            >
                {current_stuff.stuff.title}
            </Typography>
            <Typography variant="body1" component="p">
                {current_stuff.stuff.description}
            </Typography>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            {
                current_stuff.stuff.has_offer ? (
                <Grid item xs={6} container>
                    <div>
                    <Typography variant="h6" component="h6" color="grey"
                        style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "line-through" }}
                    >
                        <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                    </Typography>
                    <Typography variant="h5" component="h5" color="green"
                        style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
                    >
                        <LocalOfferRoundedIcon /> {current_stuff.stuff.offer_price}€
                    </Typography>
                    </div>
                    <div style={{ marginTop: "auto", marginLeft: 30 }}>
                    <Typography variant="h5" component="h5" color="error"
                        style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold"}}
                    >
                        {Math.round(((current_stuff.stuff.price - current_stuff.stuff.offer_price) / current_stuff.stuff.price) * 100)} <PercentRoundedIcon />
                    </Typography>
                    </div>
                </Grid>
                ) : (
                <Typography variant="h6" component="h6"
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                    <LocalMallRoundedIcon /> {current_stuff.stuff.price}€
                </Typography>
                )
            }
            
            <Button variant="contained" color="secondary" style={{ marginTop: 10 }} startIcon={<ShoppingCartOutlinedIcon />} endIcon={<OpenInNewRoundedIcon />}>
                <Typography variant="p" component="a" href={current_stuff.stuff.shopping_link}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "white" }}>Shopping link</Typography>
            </Button>

            <Divider style={{ marginTop: 10, marginBottom: 10 }}/>

            <LikeToggleBtn isLiked={current_stuff.isLiked} onClick={onLike} isMine={current_stuff.stuff.owner._id === user._id} />

            {
                current_stuff.stuff.owner._id === user._id && (
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

export default StuffBodyDetail;