import { Grid, Typography } from "@mui/material";


const ProfileHeaderBody = ({frontUser}) => {

    return (
        <>
            <Grid item xs={12} container justifyContent="center">
                <img src={frontUser.avatar} alt="stuff_image" style={{ minHeight: 300 }} />
            </Grid>
            <Grid item padding={2} container>
                <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                    style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                    {frontUser.followers} followers
                </Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="center">
                <Typography variant="p" component="p"
                    style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold" }}
                >
                    {frontUser.following} following
                </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default ProfileHeaderBody;