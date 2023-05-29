import { IconButton } from "@mui/joy";
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoriteIconBtn = ({ isLiked, onClick, isMine }) => {

    return (
        <>
          {
            !isMine && (
              <IconButton
                size="md"
                variant="solid"
                color={isLiked ? "" : "danger"}
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  right: '4.5rem',
                  bottom: 0,
                  transform: 'translateY(50%)',
                  backgroundColor: isLiked ? "background.level2" : "",
                  border: isLiked ? "2px solid #D7D7D7" : ""
                }}
                onClick={onClick}
              >
                <FavoriteIcon color={isLiked ? "error": ""} />
              </IconButton>
            )
          }
        </>
    );
}

export default FavoriteIconBtn;