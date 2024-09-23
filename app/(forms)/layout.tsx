import { Box } from "@mui/material";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ height: "100vh", color: "white" }}>
      <Box sx={{ display: "flex" }}>
        {/* Left */}
        <Box
          sx={{
            background: "#FF9921",
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: "100vh",
            p: { xs: 2, sm: 4, md: 6, lg: 10 },
          }}
        >
          <Image
            src="/images/emojione-pizza.svg"
            alt="pizza slice"
            width={305}
            height={300}
          />
        </Box>
        {/* Right */}
        <Box
          sx={{
            color: "black",
            display: "flex",
            flex: 1,
            height: "100vh",
            alignItems: "center",
            width: "100%",
            backgroundColor: "var(--textWhite)",
            p: { xs: 2, sm: 4, md: 6, lg: 10 },
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,

                alignItems: "center",
                textAlign: "left",
              }}
            >
              <Image
                src="/images/emojione-pizza.svg"
                alt="pizza slice"
                width={50}
                height={50}
              />
              <Image
                src="/images/pizza.svg"
                alt="pizza slice"
                width={66}
                height={20}
              />
            </Box>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
