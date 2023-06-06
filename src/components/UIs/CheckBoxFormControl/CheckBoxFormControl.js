import { Checkbox } from "@mui/joy";
import Close from '@mui/icons-material/Close';
import { useState } from "react";


const CheckBoxFormControl = ({ label, checked, onChange }) => {
    const [value, setValue] = useState(checked);
    const onChangeHandler = (event) => {
        setValue(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <Checkbox checked={value} uncheckedIcon={<Close />} onChange={onChangeHandler} label={label}/>
    );
};

export default CheckBoxFormControl;