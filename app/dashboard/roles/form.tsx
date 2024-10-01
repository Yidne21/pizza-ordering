import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type FormProps = {
  isEdit: boolean;
  role: {
    name?: string;
    permissions: string[];
  };
};

function Form(props: FormProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "53px",
        alignSelf: "stretch",
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
        {props.isEdit ? "Edit Role" : "Add Role"}
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        type="text"
        variant="outlined"
        sx={{ width: "360px" }}
        value={props.role.name}
      />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "370px",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "53px",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
              flexShrink: 0,
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
              Permissions
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
              {props.role.permissions.map((permission, index) => (
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
                  label={permission}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Button
          sx={{
            padding: "10px, 20px",
            justifyContent: "center",
            borderRadius: "5px",
            background: "#FF8100",
            textTransform: "capitalize",
            width: "184px",
            color: "#FFF",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px", // 109.091%
            letterSpacing: "0.15px",
          }}
        >
          {props.isEdit ? "Update" : "Add Role"}
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
