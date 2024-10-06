"use client";

import "@/components/ui/global.css";
import { inter } from "@/components/ui/fonts";
import { SessionProvider } from "next-auth/react";
import { Box } from "@mui/system";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#FFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SessionProvider>{children}</SessionProvider>
          <ToastContainer position="top-right" theme="light" autoClose={3000} />
        </Box>
      </body>
    </html>
  );
}
