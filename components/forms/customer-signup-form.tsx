"use client";

import { Box, Button, Checkbox, Typography } from "@mui/material";
import Link from "next/link";
import { customerSignUp } from "@/utils/schema";
import { customerSignUpFormTypes } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import { customerSignUpAction } from "@/lib/actions";
import { useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CustomerSignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [signUpError, setSignUpError] = useState<string | null>(null); // Track upload errors

  const {
    register,

    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<customerSignUpFormTypes>({
    resolver: zodResolver(customerSignUp),
  });

  const handleCustomerSignUp = async (data: customerSignUpFormTypes) => {
    setIsSubmitting(true);
    setSignUpError(null);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("location", data.location);
      formData.append("phoneNumber", data.phoneNumber);

      const response = await customerSignUpAction(formData);

      if (response.success) {
        reset();
      } else {
        setSignUpError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: "20px" }}
      component="form"
      onSubmit={handleSubmit(handleCustomerSignUp)}
    >
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
        error={errors.phoneNumber}
        name="phoneNumber"
        label="Phone Number"
        type="text"
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
          href={{ pathname: "/login", query: { page: "customer-sign-up" } }}
          style={{ color: "#FF8100" }}
        >
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default CustomerSignUpForm;
