import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";

interface ProjectCodeInputProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (value: string) => void;
}

export const ProjectCodeInput = ({
  onChange,
  ...props
}: ProjectCodeInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    const letters = input.slice(0, 4).replace(/[^A-Z]/g, "");
    const numbers = input.slice(4, 8).replace(/[^1-9]/g, "");

    let formatted = letters;
    if (letters.length === 4 && numbers.length > 0) {
      formatted += "-" + numbers;
    }

    onChange(formatted);
  };

  return (
    <TextField
      {...props}
      name="projectCode"
      placeholder="ABCD-9999"
      label="Project Code"
      variant="outlined"
      fullWidth
      value={props.value}
      onChange={handleChange}
      required
      slotProps={{
        htmlInput: {
          minLength: 9,
        },
      }}
    />
  );
};
