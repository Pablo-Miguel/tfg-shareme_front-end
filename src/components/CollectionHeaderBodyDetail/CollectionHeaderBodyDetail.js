import { Avatar, Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import ImgCarousel from "../UIs/ImgCarousel/ImgCarousel";

const CollectionHeaderBodyDetail = ({ collection }) => {

    return (
        <>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }} flexDirection="column">
                <Grid item xs={12} container direction="row" style={{ marginTop: 10, marginBottom: 10 }}>
                    <Avatar src={collection.owner.avatar} alt={collection.owner.name} 
                        style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    <Typography variant="p" component="p">
                    {collection.owner.nickName}
                    </Typography>
                </Grid>
            </Box>
            <Grid item xs={12} style={{ padding: 10 }}>
                <ImgCarousel stuff={collection.stuff} />
            </Grid>
            <Grid item padding={2} container>
                <Grid item xs={6} container justifyContent="center">
                    <Typography variant="p" component="p"
                    style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                    <RemoveRedEyeIcon color="secondary" /> {collection.views}
                    </Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="center">
                    <Typography variant="p" component="p"
                    style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                    >
                    <FavoriteIcon color="error" /> {collection.likes}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default CollectionHeaderBodyDetail;