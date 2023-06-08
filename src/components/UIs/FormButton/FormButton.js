import React from 'react';

import { Button } from '@mui/joy';

const FormButton = (props) => {
    return (
        <Button 
            variant={props.variant ? props.variant : "solid"}
            type={props.type ? props.type : "submit"}
            loading={props.isLoading}
            loadingPosition={props.loadingPosition}
            startDecorator={props.startDecorator}
            endDecorator={props.endDecorator}
            fullWidth={props.fullWidth}
            style={{ marginTop: 10, gap: 10 }}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
};

export default FormButton;