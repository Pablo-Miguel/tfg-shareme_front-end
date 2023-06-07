import React from "react";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

import classes from './DeleteConfirmationModal.module.css';

const DeleteConfirmationModal = ({ open, setOpen, type, onDelete }) => {

    const onDeleteHandler = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
            >
                <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                >
                    Confirmation
                </Typography>
                <Divider />
                <Typography id="alert-dialog-modal-description" className={classes.text}>
                    Are you sure you want to delete your {type}?
                </Typography>
                <Box className={classes.box}>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" color="danger" onClick={onDeleteHandler}>
                        Delete {type}
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default DeleteConfirmationModal;