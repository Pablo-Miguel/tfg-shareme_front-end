import { IconButton } from "@mui/joy";
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoriteIconBtn = ({ stuff, onClick, isMine }) => {

    return (
        <IconButton
            size="md"
            variant="solid"
            color={stuff.isLiked ? "" : "danger"}
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '4.5rem',
              bottom: 0,
              transform: 'translateY(50%)',
              backgroundColor: stuff.isLiked ? "background.level2" : "",
              border: stuff.isLiked ? "2px solid #D7D7D7" : ""
            }}
            onClick={onClick}
            disabled={isMine}
          >
            <FavoriteIcon color={stuff.isLiked ? "error": ""} />
          </IconButton>
    );
}

export default FavoriteIconBtn;