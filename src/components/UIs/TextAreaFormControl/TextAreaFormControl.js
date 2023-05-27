import { Box, FormControl, FormLabel, Textarea, Typography } from "@mui/joy";


const TextAreaFormControl = props => {

    return (
        <FormControl required={props.isRequired ? props.isRequired : false} style={{ marginBottom: 30 }}>
            <FormLabel>{props.label}</FormLabel>
            <Textarea
                placeholder={props.placeholder}
                name={props.name}
                minRows={3}
                value={props.value}
                onChange={props.onChange}
                endDecorator={
                    <Box
                            sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                            }}
                        >
                            <Typography level="body3">
                                {props.text.length} character(s)
                            </Typography>
                        </Box>
                }
                sx={{
                    minWidth: 300
                }}
            />
        </FormControl>
    );
};

export default TextAreaFormControl;