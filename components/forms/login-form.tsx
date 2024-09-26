"use client";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {
  return (
    <>
      <Typography
        sx={{
          mt: 2,
          fontSize: 24,
          textAlign: "left",
          color: "#000000DE",
          fontFamily: "Roboto",
          fontWeight: 400,
          lineHeight: "133.4%",
          fontStyle: "normal",
          alignSelf: "stretch",
        }}
      >
        Login
      </Typography>
      <Divider variant="fullWidth" sx={{ width: "100%" }} />

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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox {...label} />
          <Typography>Remember me</Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            background: "#FF8100",
          }}
        >
          LOGIN
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>Have not have an account?</Typography>
          <Link href="/" style={{ color: "#FF8100" }}>
            Sign up
          </Link>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
