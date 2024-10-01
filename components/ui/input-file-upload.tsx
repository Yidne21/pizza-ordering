import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Typography } from "@mui/material";
import { FieldError } from "react-hook-form";

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

interface InputFileUploadProps {
  label: string;
  register: any;
  name: string;
  error?: FieldError | string;
}

export default function InputFileUpload({
  label,
  register,
  name,
  error,
}: InputFileUploadProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "columun",
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
        <VisuallyHiddenInput type="file" {...register(name)} multiple />
      </Button>
      {error && (
        <Typography sx={{ color: "red" }}>{error.toString()}</Typography>
      )}
    </Box>
  );
}
