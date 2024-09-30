/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Radio,
  ListItemText,
  Box,
} from "@mui/material";

type DropdownProps = {
  status: string;
};

export default function Dropdown(props: DropdownProps) {
  const [status, setStatus] = useState(props.status);

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };

  const sharedStyle = {
    textAlign: "center",
    fontFeatureSettings: "'liga' off, 'clig' off",
    fontFamily: "Roboto, sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.25px",
  };

  return (
    <FormControl>
      <Select
        value={status}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Order status" }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: status === "PREPARING" ? "#FFA500" : "#008000",
          height: "26px",
          color: "#ffffff",
          borderRadius: "5px",
          "& .MuiSelect-icon": {
            color: "#fff",
            width: "24px",
            height: "24px",
          },
        }}
      >
        <MenuItem value="PREPARING">
          <Box display="flex" alignItems="center">
            <ListItemText
              primary="PREPARING"
              primaryTypographyProps={{
                sx: {
                  ...sharedStyle,
                },
              }}
            />
            {status !== "PREPARING" && (
              <Radio checked={status === "PREPARING"} />
            )}
          </Box>
        </MenuItem>
        <MenuItem value="READY">
          <Box display="flex" alignItems="center">
            <ListItemText
              primary="READY"
              primaryTypographyProps={{
                sx: {
                  ...sharedStyle,
                },
              }}
            />
            {status !== "READY" && <Radio checked={status === "READY"} />}
          </Box>
        </MenuItem>
        <MenuItem value="DELIVERED">
          <Box display="flex" alignItems="center">
            <ListItemText
              primary="DELIVERED"
              primaryTypographyProps={{
                sx: {
                  ...sharedStyle,
                },
              }}
            />
            {status !== "DELIVERED" && (
              <Radio checked={status === "DELIVERED"} />
            )}
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
