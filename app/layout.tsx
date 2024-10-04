"use client";

import "@/components/ui/global.css";
import { inter } from "@/components/ui/fonts";
import { SessionProvider } from "next-auth/react";
import { Box } from "@mui/system";

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
        </Box>
      </body>
    </html>
  );
}
