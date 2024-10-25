import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Typography } from "@mui/material";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadProps<T extends FieldValues> {
  label: string;
  type: string;
  register: UseFormRegister<T>;
  name: keyof T; // Ensures `name` is one of the keys from the form's type
  error?: FieldError | string;
}

export default function InputFileUpload<T extends FieldValues>({
  label,
  register,
  type,
  name,
  error,
}: InputFileUploadProps<T>) {
  const [fileName, setFileName] = React.useState<string | null>(null);

  console.log("file", fileName);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Fixed flex direction to column for alignment
        gap: "10px",
        padding: "5px",
        borderRadius: "3px",
        color: "#000",
      }}
    >
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<FileUploadOutlinedIcon sx={{ color: "#FF8100" }} />}
        sx={{
          color: "#FF8100",
          borderStyle: "dashed",
          height: 50,
          borderRadius: "5px",
          border: "1px dashed #000",
        }}
      >
        {label}
        <VisuallyHiddenInput
          type={type}
          {...register(name as Path<T>, { valueAsNumber: type === "number" })}
          onChange={(e) => setFileName(e.target.files?.[0].name ?? null)}
          multiple
        />
      </Button>
      {error && (
        <Typography sx={{ color: "red" }}>{error.toString()}</Typography>
      )}
      {/* Display file name */}
      {fileName && (
        <Typography
          sx={{
            color: "#000",
            fontFamily: "Roboto",
            fontSize: { xs: "10px", sm: "12px", lg: "15px" },
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: { xs: "9px", lg: "14px" },
            letterSpacing: { xs: "0.3px", lg: "0.45px" },
            mt: "10px",
          }}
        >
          {fileName}
        </Typography>
      )}
    </Box>
  );
}
