import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // protected routes
  matcher: [
    "/dashboard/:path*", // Protect the dashboard route
    "/orders", // Protect the orders route
    "/order/:path*", // Protect any dynamic routes under /order, like /order/123, /order/abc, etc.
  ],
};
