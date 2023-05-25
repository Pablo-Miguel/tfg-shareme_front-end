import Backdrop from '@mui/material/Backdrop';
import Spinner from '../Spinner/Spinner';

const SimpleBackdrop = props => {

    return (
      <Backdrop
        sx={{ color: '#EEEEEE', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <Spinner color="inherit" />
      </Backdrop>
    )
};

export default SimpleBackdrop;