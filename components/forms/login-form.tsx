"use client";

import { Box, Button, Checkbox, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { LoginSchema } from "@/utils/schema";
import { LoginFormTypes } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {
  const navigation = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [loginError, setLoginError] = useState<string | null | undefined>(null); // Track upload errors

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginFormTypes) => {
    setIsSubmitting(true);
    setLoginError(null);

    const response = await signIn("credentials", {
      redirect: false, // Prevent redirect here to manually handle it
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      setLoginError(response.error);
      setIsSubmitting(false);
    } else {
      reset();
      // Wait for session update before redirecting
      const updatedSession = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      if (updatedSession?.user?.role?.name) {
          navigation.push("/");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        mt: "20px",
      }}
      component="form"
      onSubmit={handleSubmit(handleLogin)}
    >
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
        disabled={isSubmitting}
      >
        LOGIN
      </Button>

      {loginError && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {loginError}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Have not have an account?</Typography>
        <Link
          href={"/manager-sign-up"}
          style={{ color: "#FF8100", font: "8px" }}
        >
          Sign up as Resturant Owner
        </Link>
        <Link href={"/customer-sign-up"} style={{ color: "#FF8100" }}>
          Sign Up as Customer
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
