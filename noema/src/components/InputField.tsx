import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface InputFieldProps {
  [key: string]: any;
}

export function InputField({ ...props }: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };

  return (
    <TextField
      label={props.label}
      name={props.name}
      value={props.value}
      onChange={handleChange}
      required={props.required}
    />
  );
}
