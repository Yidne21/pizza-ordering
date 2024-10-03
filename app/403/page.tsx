"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "100px" }}>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "50px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h1" color="primary" sx={{ fontWeight: "bold" }}>
          403
        </Typography>
        <Typography variant="h4" color="textPrimary" sx={{ marginTop: "20px" }}>
          Unauthorized Access
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: "10px", marginBottom: "20px" }}
        >
          Sorry, you do not have permission to view this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoBack}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            fontSize: "16px",
            padding: "10px 30px",
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
