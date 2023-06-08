import React from "react";

import { Box, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";

import classes from "./TextAreaFormControl.module.css";

const TextAreaFormControl = props => {

    return (
        <FormControl required={props.isRequired ? props.isRequired : false} className={classes.formControl}>
            <FormLabel>{props.label}</FormLabel>
            <Textarea
                placeholder={props.placeholder}
                name={props.name}
                minRows={3}
                value={props.text}
                onChange={props.onChange}
                endDecorator={
                    <Box
                        className={classes.box}
                    >
                        <Typography level="body3">
                            {props.text.length} character(s)
                        </Typography>
                    </Box>
                }
                className={classes.textArea}
            />
        </FormControl>
    );
};

export default TextAreaFormControl;