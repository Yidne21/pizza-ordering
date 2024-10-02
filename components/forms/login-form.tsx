"use client";

import { Box, Button, Checkbox, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginSchema } from "@/utils/schema";
import { LoginFormTypes } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input-field";
import { authenticate } from "@/lib/actions";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {
  const router = useSearchParams();
  const page = router.get("page");

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

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await authenticate(formData);

      if (response?.success) {
        reset();
        setIsSubmitting(false);
      } else {
        setLoginError(response?.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        Login
      </Typography>
      <Divider variant="fullWidth" sx={{ width: "100%" }} />

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
          <Link href={"/" + page} style={{ color: "#FF8100" }}>
            Sign up
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
