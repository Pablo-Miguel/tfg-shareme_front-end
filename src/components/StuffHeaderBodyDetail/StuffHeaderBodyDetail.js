import { Avatar, Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const StuffHeaderBodyDetail = ({ current_stuff }) => {

    return (
        <>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }} flexDirection="column">
              <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                <Avatar src={current_stuff.stuff.owner.avatar} alt={current_stuff.stuff.owner.name} 
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Typography variant="p" component="p">
                  {current_stuff.stuff.owner.nickName}
                </Typography>
              </Grid>

              <Typography variant="h6" component="h6"
                style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
              >
                <ArrowForwardIosRoundedIcon /> {current_stuff.stuff.category}
              </Typography>
            </Box>
            <Grid item xs={12} container justifyContent="center">
              <img src={current_stuff.stuff.image} alt="stuff_image" style={{ minHeight: 300 }} />
            </Grid>
            <Grid item padding={2} container>
              <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                  <RemoveRedEyeIcon color="secondary" /> {current_stuff.stuff.views}
                </Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                  <FavoriteIcon color="error" /> {current_stuff.stuff.likes}
                </Typography>
              </Grid>
            </Grid>
        </>
    );
};

export default StuffHeaderBodyDetail;