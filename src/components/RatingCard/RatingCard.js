import { AspectRatio, Card, Typography } from "@mui/joy";
import { Grid, Rating } from "@mui/material";

const RatingCard = ({ rating, comment, from }) => {

    return(
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 'calc(100% - 35px)',
                gap: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={4} sm={3} md={2} padding={1}>
                    <AspectRatio ratio="1" sx={{ maxWidth: 90 }}>
                        <img
                            src={from.avatar}
                            srcSet={from.avatar}
                            loading="lazy"
                            alt={from.nickName}
                        />
                    </AspectRatio>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Typography level="h6" aria-describedby="card-description" mb={1}>
                            {from.nickName}
                        </Typography>
                    </Grid>
                    <Rating name="read-only" value={rating} readOnly />
                    <Typography
                        level="body1"
                        id="card-description"
                        mb={0.5}
                        sx={{
                          wordWrap: 'break-word',
                          hyphens: 'auto',
                        }}
                    >
                        {comment}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
};

export default RatingCard;