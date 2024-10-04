"use client";

import { Box, Button, Checkbox, Typography } from "@mui/material";
import Link from "next/link";
import { managerSignUpSchema } from "@/utils/schema";
import { managerSignUpFormTypes } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import { managerSignUpAction } from "@/lib/authActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputFileUpload from "../ui/input-file-upload";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const ManagerSignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,

    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<managerSignUpFormTypes>({
    resolver: zodResolver(managerSignUpSchema),
  });

  const handleManagerSignUp = async (data: managerSignUpFormTypes) => {
    setIsSubmitting(true);
    setSignUpError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("location", data.location);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("restaurantName", data.restaurantName);
      formData.append("logo", data.logo[0]);

      const response = await managerSignUpAction(formData);

      if (response.success) {
        setIsSubmitting(false);
        reset();
        router.push("/login");
      } else {
        setSignUpError(response.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "5px", mt: "5px" }}
      component="form"
      onSubmit={handleSubmit(handleManagerSignUp)}
    >
      <InputField
        label="Name"
        type="text"
        name="name"
        register={register}
        error={errors.name}
      />
      <InputField
        register={register}
        error={errors.email}
        name="email"
        label="Email address"
        type="email"
      />
      <InputField
        register={register}
        error={errors.password}
        name="password"
        label="Password"
        type="password"
      />

      <InputField
        register={register}
        error={errors.confirmPassword}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
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
        error={errors.location}
        name="restaurantName"
        label="Restaurant Name"
        type="text"
      />

      <InputField
        register={register}
        error={errors.phoneNumber}
        name="phoneNumber"
        label="Phone Number"
        type="text"
      />

      {/* File Upload */}
      <InputFileUpload
        label="Upload Restaurant Logo"
        name="logo"
        register={register}
        error={errors.logo?.message?.toString()}
        type="file"
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
        disabled={isSubmitting}
      >
        SIGN UP
      </Button>

      {signUpError && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {signUpError}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Already have an account?</Typography>
        <Link
          href={{ pathname: "/login", query: { page: "manager-sign-up" } }}
          style={{ color: "#FF8100" }}
        >
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default ManagerSignUpForm;
