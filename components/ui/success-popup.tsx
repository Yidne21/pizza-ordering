import React from "react";
import CustomModal from "./Modal";
import { Box, Typography } from "@mui/material";
import Done from "@mui/icons-material/Done";

type SuccessPopUpProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

function SuccessPopUp(props: SuccessPopUpProps) {
  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="600px"
      height="350px"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          padding: "40px",
        }}
      >
        <Box
          sx={{
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(5, 198, 5, 0.1)",
            borderRadius: "50%",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#05C605",
              borderRadius: "50%",
            }}
          >
            <Done
              sx={{
                fontSize: "64px",
                color: "#FFFFFF",
              }}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            color: "#05C605",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            letterSpacing: "0.5px",
          }}
        >
          {props.message}
        </Typography>
      </Box>
    </CustomModal>
  );
}

export default SuccessPopUp;
