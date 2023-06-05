import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input } from "@mui/joy";

const InputFormControl = (props) => {
  const [value, setValue] = useState(props.initialValue || "");

  useEffect(() => {

    if (props.initialValue === '___CLEAR___') {
      setValue('');
    } else {
      setValue(props.initialValue || '');
    }

  }, [props.initialValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl required={props.isRequired} style={{ marginBottom: 30 }}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default InputFormControl;
