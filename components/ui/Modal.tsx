"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  width?: string;
  height?: string;
};

export default function CustomModal(props: CustomModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.width || "457px",
    height: props.height || "283px",
    bgcolor: "background.paper",
    borderRadius: "20px",
    padding: "20px",
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        {props.showCloseIcon && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "10px",
            }}
          >
            <CloseIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={props.onClose}
            />
          </Box>
        )}
        <Box>{props.children}</Box>
      </Box>
    </Modal>
  );
}
