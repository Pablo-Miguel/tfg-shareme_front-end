import { useState } from "react";
import { Box, Button, FormControl, FormLabel} from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Grid } from "@mui/material";

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
                sx={{
                width: 1,
                height: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
                }}
            >
                <input
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={imageOnChangeHandler}
                />
                <label htmlFor="raised-button-file"
                    style={{ width: '100%', height: '100%' }}
                >
                    <Button
                        variant="text"
                        component="span"
                        style={{ width: '100%' }}
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
                    alignItems={'center'}
                    direction={'column'}
                >
                    <img src={file.preview} alt="Uploaded img" style={
                        {
                            width: '50%',
                            height: 'auto',
                            marginTop: 10,
                            borderRadius: 1,
                        }
                    } />
                </Grid>
            )}
        </FormControl>
    );
};

export default ImageFormControl;