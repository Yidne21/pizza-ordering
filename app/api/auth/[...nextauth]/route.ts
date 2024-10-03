import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // Assuming authOptions are defined in a separate file

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
