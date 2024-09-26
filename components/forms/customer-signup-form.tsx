"use client";

import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CustomerSignUpForm = () => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 20,
      }}
    >
      <TextField
        id="outlined-basic"
        label="Email address"
        type="email"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
      />

      <TextField
        id="outlined-basic"
        label="Confirm Password"
        type="password"
        variant="outlined"
      />

      <TextField
        id="outlined-basic"
        label="Location"
        type="text"
        variant="outlined"
      />

      <TextField
        id="outlined-basic"
        label="Phone Number"
        type="text"
        variant="outlined"
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox {...label} />
        <Typography>I accept the Terms and Conditions</Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "100%",
          background: "#FF8100",
        }}
      >
        SIGN UP
      </Button>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Already have an account?</Typography>
        <Link href="/login" style={{ color: "#FF8100" }}>
          Login
        </Link>
      </Box>
    </form>
  );
};

export default CustomerSignUpForm;
