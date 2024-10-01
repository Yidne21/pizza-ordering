"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import InputFileUpload from "@/components/ui/input-file-upload";
import SuccessPopUp from "@/components/ui/success-popup";

const toppings = ["Cheese", "Pepperoni", "Sausage", "Onions", "Peppers"];
function AddMenuForm() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "1040px",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        justifyContent: "center",
        padding: "30px 31px 320px 31px",
      }}
    >
      <Typography
        sx={{
          color: "var(--Gray-02, #525256)",
          fontFamily: "Inter",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px", // or 1.09 for 109.091%
          textTransform: "capitalize",
        }}
      >
        Add Menu
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.50)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontFamily: "Roboto",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px", // 109.091%
              letterSpacing: "0.15px",
            }}
          >
            Toppings
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: "0px", lg: "15px" },
              flexWrap: "wrap",
              alignItems: "center",
              alignContent: "center",
              color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "150%", // 24px
              letterSpacing: "0.15px",
            }}
          >
            {toppings.map((topping, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      "&.Mui-checked": {
                        color: "#FF8100",
                      },
                    }}
                  />
                }
                label={topping}
              />
            ))}
          </Box>
        </Box>

        <TextField
          id="outlined-basic"
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
        />
      </Box>
      <InputFileUpload label="Upload Pizza Photo" />

      <Button
        sx={{
          width: "321px",
          height: "74px",
          flexShrink: 0,
          color: "#FFF",
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px", // 150%
          textTransform: "capitalize",
          background: "#FF8100",
          borderRadius: "20px",
        }}
        onClick={handleOpen}
      >
        Submit
      </Button>
      <SuccessPopUp
        open={open}
        onClose={handleClose}
        message="You have uploaded the Pizza successfully. "
      />
    </Box>
  );
}

export default AddMenuForm;
