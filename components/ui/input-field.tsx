import { TextField, Typography, TextFieldProps } from "@mui/material";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  name: keyof T; // This ensures `name` is a key from the form's type
  register: UseFormRegister<T>;
  error?: FieldError;
  InputLabelProps?: TextFieldProps["InputLabelProps"];
  value?: string;
};

const InputField = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  error,
  InputLabelProps,
  value,
}: InputFieldProps<T>) => {
  return (
    <>
      <TextField
        {...register(name as Path<T>, { valueAsNumber: type === "number" })}
        label={label}
        type={type}
        variant="outlined"
        InputLabelProps={InputLabelProps}
        value={value}
      />
      {error?.message && (
        <Typography sx={{ color: "red" }}>{error.message}</Typography>
      )}
    </>
  );
};

export default InputField;
