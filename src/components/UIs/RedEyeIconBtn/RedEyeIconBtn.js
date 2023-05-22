import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton } from '@mui/joy';

const RedEyeIconBtn = (props) => {

    return (
        <IconButton
            size="md"
            variant="solid"
            color="info"
            sx={{
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                right: '1rem',
                bottom: 0,
                transform: 'translateY(50%)',
            }}
            onClick={props.onClick}
        >
            <RemoveRedEyeIcon />
        </IconButton>
    );
}

export default RedEyeIconBtn;