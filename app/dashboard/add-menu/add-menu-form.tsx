// app/addBook/page.tsx
"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
} from "@mui/material";
import InputFileUpload from "@/components/ui/input-file-upload";
import SuccessPopUp from "@/components/ui/success-popup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMenuFormTypes } from "@/utils/types";
import { addMenuSchema } from "@/utils/schema";
import InputField from "@/components/ui/input-field";
import { addMenu } from "@/lib/adminActions";
import ToppingComponent from "./toppings";
import { toast } from "react-toastify";

function AddMenuForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [uploadError, setUploadError] = useState<string | null>(null);
  const handleClose = () => setOpen(!open);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

 

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
    setIsSubmitting(true); 
    setUploadError(null); 

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("image", data.logo[0]); 
      formData.append("toppings", JSON.stringify(data.toppings));
      const response = await addMenu(formData);

      if (response.success) {
        setOpen(true); 
        reset(); 
      } else {
        setUploadError(response.message);
        toast.error(uploadError);
      }
    } catch (error) {
      console.log(error);
      setUploadError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
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
      onSubmit={handleSubmit(handleFormSubmit)}
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
            <ToppingComponent 
            control={control}
            selectedToppings={selectedToppings}
            setSelectedToppings={setSelectedToppings}
            />              
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
