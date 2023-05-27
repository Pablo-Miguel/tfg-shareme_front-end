import { FormControl, FormLabel, Input } from "@mui/joy";


const InputFormControl = props => {

    return (
        <FormControl required={props.isRequired} style={{ marginBottom: 30 }}>
            <FormLabel>{props.label}</FormLabel>
            <Input
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
            />
        </FormControl>
    );
};

export default InputFormControl;