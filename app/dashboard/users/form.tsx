"use client";

import React, { useState } from "react";
import {
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import InputField from "@/components/ui/input-field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserFormTypes } from "@/utils/types";
import { addUserSchema } from "@/utils/schema";
import { addUser } from "@/lib/adminActions";

type FormProps = {
  roles: string[];
  isEdit: boolean;
};

function Form(props: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [addError, setAddError] = useState<string | null>(null); // Track upload errors

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addUserFormTypes>({
    resolver: zodResolver(addUserSchema),
  });

  const handleAddUser = async (data: addUserFormTypes) => {
    setIsSubmitting(true);
    setAddError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("location", data.location);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("role", data.role);

      const response = await addUser(formData);

      if (response.success) {
        reset();
      } else {
        setAddError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      component="form"
      onSubmit={handleSubmit(handleAddUser)}
    >
      <InputField
        register={register}
        error={errors.name}
        name="name"
        label="Name"
        type="text"
      />
      <InputField
        register={register}
        error={errors.email}
        name="email"
        label="Email"
        type="email"
      />
      <InputField
        register={register}
        error={errors.location}
        name="location"
        label="Location"
        type="text"
      />
      <InputField
        register={register}
        error={errors.phoneNumber}
        name="phoneNumber"
        label="Phone Number"
        type="text"
      />
      <InputField
        register={register}
        error={errors.password}
        name="password"
        label="Password"
        type="password"
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
          <Controller
            name="role" // Register 'role' field
            control={control}
            defaultValue={props.roles[0]} // Set default value to first role
            render={({ field }) => (
              <Select
                {...field}
                label="Select Role"
                value={field.value} // Controlled by react-hook-form
                onChange={field.onChange} // Handle changes
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
            )}
          />
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
          type="submit"
          disabled={isSubmitting}
        >
          {props.isEdit ? "Edit" : "Add"}
        </Button>
        {addError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {addError}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Form;
