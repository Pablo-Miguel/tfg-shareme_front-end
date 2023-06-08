import React, { useState } from "react";

import { Box, Button, FormControl, FormLabel} from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from "@mui/material";

import classes from "./ImageFormControl.module.css";

const ImageFormControl = props => {
    const [file, setFile] = useState(props.initialValue ? { preview: props.initialValue } : null);

    const imageOnChangeHandler = (event) => {
        const eventFile = event.target.files[0];
        setFile({
            preview: URL.createObjectURL(eventFile)
        });
        props.onChange({
            file: eventFile,
            preview: URL.createObjectURL(eventFile),
            clear: () => {
                setFile(null);
            }
        });
    };

    return (
        <FormControl>
            <FormLabel>Image</FormLabel>
            <Box
                className={classes.box}
            >
                <input
                    accept=".jpg,.jpeg,.png"
                    className={classes.input}
                    id="raised-button-file"
                    type="file"
                    onChange={imageOnChangeHandler}
                />
                <label htmlFor="raised-button-file"
                    className={classes.label}
                >
                    <Button
                        variant="text"
                        component="span"
                        className={classes.btn}
                        startDecorator={<KeyboardArrowDown />}
                    >
                        Upload
                    </Button>
                </label>
            </Box>
            {file && (
                <Grid
                    item
                    xs={12}
                    container
                    className={classes.grid}
                >
                    <img src={file.preview} alt="Uploaded img" className={classes.img} />
                </Grid>
            )}
        </FormControl>
    );
};

export default ImageFormControl;