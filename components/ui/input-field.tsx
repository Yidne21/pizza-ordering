import { TextField, Typography } from "@mui/material";
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
  value?: string;
  size?: "small" | "medium";
};

const InputField = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  error,
  value,
  size,
}: InputFieldProps<T>) => {
  return (
    <>
      <TextField
        {...register(name as Path<T>, { valueAsNumber: type === "number" })}
        label={label}
        type={type}
        variant="outlined"
        value={value}
        fullWidth
        size={size}
      />
      {error?.message && (
        <Typography sx={{ color: "red", fontSize: "12px" }}>
          {error.message}
        </Typography>
      )}
    </>
  );
};

export default InputField;
