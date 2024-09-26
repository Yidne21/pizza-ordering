import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f2e0c0", p: 4, textAlign: "center" }}>
      <Box sx={{ mb: 3 }}>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Order</Button>
        <Button color="inherit">About Us</Button>
      </Box>
      <TextField
        variant="outlined"
        placeholder="Your feedback..."
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="warning">
        Submit
      </Button>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
        © 2024 Pizza All Rights Reserved. Terms & Conditions
      </Typography>
    </Box>
  );
};

export default Footer;
