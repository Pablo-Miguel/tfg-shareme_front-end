import { FormControl, FormLabel, selectClasses, Select, Option } from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const SelectFormControl = props => {

    return (
        <FormControl required={props.isRequired}>
            {
                props.label && 
                    <FormLabel>{props.label}</FormLabel>
            }
            <Select
                name={props.name}
                placeholder={props.placeholder}
                indicator={<KeyboardArrowDown />}
                defaultValue={props.initialValue ? props.initialValue : ''}
                sx={{
                [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                    },
                },
                }}
                onChange={props.onChange}
            >
                {props.options.map((option) => (
                    <Option value={option} key={option}>
                        {option}
                    </Option>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectFormControl;