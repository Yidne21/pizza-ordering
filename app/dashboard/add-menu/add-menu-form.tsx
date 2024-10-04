// app/addBook/page.tsx
"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import InputFileUpload from "@/components/ui/input-file-upload";
import SuccessPopUp from "@/components/ui/success-popup";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMenuFormTypes } from "@/utils/types";
import { addMenuSchema } from "@/utils/schema";
import InputField from "@/components/ui/input-field";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { addMenu } from "@/lib/adminActions"; // Import the server action

const toppings = ["Cheese", "Pepperoni", "Sausage", "Onions", "Peppers"];

function AddMenuForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [uploadError, setUploadError] = useState<string | null>(null); // Track upload errors
  const handleClose = () => setOpen(!open);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addMenuFormTypes>({
    resolver: zodResolver(addMenuSchema),
  });

  // Handle form submission
  const handleFormSubmit = async (data: addMenuFormTypes) => {
    setIsSubmitting(true); // Mark form as submitting
    setUploadError(null); // Clear previous errors

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("logo", data.logo[0]); // Assuming the logo is an array of files
      formData.append("toppings", JSON.stringify(data.toppings)); // Send toppings as JSON

      const response = await addMenu(formData); // Call the server action

      if (response.success) {
        setOpen(true); // Open success popup
        reset(); // Reset form after successful submission
      } else {
        setUploadError(response.message); // Show error if upload fails
      }
    } catch (error) {
      console.log(error);
      setUploadError("Something went wrong."); // Handle error during submission
    } finally {
      setIsSubmitting(false); // Mark form as not submitting
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        justifyContent: "center",
        padding: "30px 31px 320px 31px",
      }}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)} // Use handleFormSubmit to process form
    >
      <Typography
        sx={{
          color: "var(--Gray-02, #525256)",
          fontFamily: "Inter",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          textTransform: "capitalize",
        }}
      >
        Add Menu
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
          {/* Input Field for Name */}
          <InputField
            label="Name"
            type="text"
            name="name"
            register={register}
            error={errors.name}
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
                lineHeight: "24px",
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
                lineHeight: "150%",
                letterSpacing: "0.15px",
              }}
            >
              {toppings.map((topping, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Controller
                      name="toppings"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          value={topping}
                          checked={field.value.includes(topping)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, e.target.value]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (val) => val !== e.target.value
                                )
                              );
                            }
                          }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#FF8100",
                            },
                          }}
                        />
                      )}
                    />
                  }
                  label={topping}
                />
              ))}
              <Button
                startIcon={<AddOutlinedIcon />}
                sx={{
                  display: "flex",
                  padding: "5px",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "3px",
                  background: "#FF8100",
                  color: "#FFF",
                }}
              >
                Add
              </Button>
            </Box>
          </Box>

          {/* Input Field for Price */}
          <InputField
            label="Price"
            type="number"
            name="price"
            register={register}
            error={errors.price}
          />
        </Box>
      </Box>

      {/* File Upload */}
      <InputFileUpload
        label="Upload Pizza Photo"
        name="logo"
        register={register}
        error={errors.logo?.message?.toString()}
        type="file"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting} // Disable the button while submitting
        sx={{
          width: "321px",
          height: "74px",
          flexShrink: 0,
          color: "#FFF",
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "capitalize",
          background: "#FF8100",
          borderRadius: "20px",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {/* Show upload error if any */}
      {uploadError && (
        <Typography color="error" sx={{ mt: 2 }}>
          {uploadError}
        </Typography>
      )}

      {/* Success Pop-up */}
      <SuccessPopUp
        open={open}
        onClose={handleClose}
        message="You have uploaded the Pizza successfully."
      />
    </Box>
  );
}

export default AddMenuForm;
