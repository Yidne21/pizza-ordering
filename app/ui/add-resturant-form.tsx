"use client";

import { Button, Divider, TextField, Typography } from "@mui/material";
import InputFileUpload from "./input-file-upload";

const AddResturantForm = () => {
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
        Add Resturant
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
          label="Resturant Name"
          type="text"
          variant="outlined"
        />

        <TextField
          id="outlined-basic"
          label="Phone Number"
          type="text"
          variant="outlined"
        />

        <TextField
          id="outlined-basic"
          label="Location"
          type="text"
          variant="outlined"
        />

        <InputFileUpload label="Upload Logo" />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            background: "#FF8100",
          }}
        >
          CONTINUE
        </Button>
      </form>
    </>
  );
};

export default AddResturantForm;
