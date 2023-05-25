import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const CstAlert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = (props) => {

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <CstAlert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </CstAlert>
        </Snackbar>
    )
}

export default Alert;