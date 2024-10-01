// eslint-disable-no-explicit-any

import { Box, TextField, Typography } from "@mui/material";
import { FieldError } from "react-hook-form";
import { SxProps, Theme } from "@mui/system";

type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  register: any;
  error?: FieldError;
  InputLabelProps?: any;
  sx?: SxProps<Theme>;
  value?: string;
};

const InputField = ({
  label,
  type,
  name,
  register,
  error,
  InputLabelProps,
  sx,
  value,
}: InputFieldProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        ...sx,
      }}
    >
      <TextField
        {...register(name, { valueAsNumber: type === "number" })}
        label={label}
        type={type}
        variant="outlined"
        slotProps={InputLabelProps}
        value={value}
      />
      {error?.message && (
        <Typography sx={{ color: "red" }}>
          {error.message.toString()}
        </Typography>
      )}
    </Box>
  );
};

export default InputField;
