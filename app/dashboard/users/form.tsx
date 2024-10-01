import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";

type FormProps = {
  roles: string[];
  isEdit: boolean;
};

function Form(props: FormProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "30px",
        width: "100%",
      }}
    >
      <TextField
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        fullWidth
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Location"
        type="text"
        variant="outlined"
      />

      <TextField
        fullWidth
        id="outlined-basic"
        label="Phone Number"
        type="text"
        variant="outlined"
      />

      <TextField
        fullWidth
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormControl>
          <Select
            label="Select Role"
            value={props.roles[0]}
            renderValue={(value) => value}
            sx={{
              "& .MuiSelect-icon": {
                color: "#000",
                width: "24px",
                height: "24px",
              },
              width: "223px",
              color: "#000",
            }}
          >
            {props.roles.map((role) => (
              <MenuItem key={role} value={role}>
                <ListItemText
                  primary={role}
                  primaryTypographyProps={{
                    sx: {
                      color: "#000",
                      textAlign: "center",
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px", // 166.667%
                      letterSpacing: "0.25px",
                    },
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            display: "flex",
            width: "231px",
            height: "var(--7, 56px)",
            padding: "10px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            borderRadius: "5px",
            background: "#FF8100",
            color: "#FFF",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px", // 109.091%
            letterSpacing: "0.15px",
            textTransform: "capitalize",
          }}
        >
          {props.isEdit ? "Edit" : "Add"}
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
