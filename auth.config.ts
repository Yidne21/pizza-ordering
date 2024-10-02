import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnOrders = nextUrl.pathname.startsWith("/orders");
      const isOnOrder = nextUrl.pathname.startsWith("/order");
      if (isOnDashboard || isOnOrders || isOnOrder) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const role = auth.user?.role.name;
        if (role === "superadmin") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }

        if (role === "customer") {
          return Response.redirect(new URL("/", nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
