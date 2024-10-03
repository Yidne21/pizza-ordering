export { default } from "next-auth/middleware";

export const config = {
  // protected routes
  matcher: [
    "/dashboard/:path*", // Protect the dashboard route
    "/orders", // Protect the orders route
    "/order/:path*", // Protect any dynamic routes under /order, like /order/123, /order/abc, etc.
  ],
};
