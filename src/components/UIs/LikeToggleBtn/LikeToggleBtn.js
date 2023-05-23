import { Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeToggleBtn = ({ isLiked, onClick, isMine }) => {

    return (
        <>
            {
                !isMine && (
                    <Button variant="contained" color="error" style={{ marginTop: 10 }} startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={onClick}>
                        {isLiked ? "Unlike" : "Like"}
                    </Button>
                )
            }
        </>
    );
};

export default LikeToggleBtn;
