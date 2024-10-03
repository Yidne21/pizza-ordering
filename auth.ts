import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              password: true,
              role: {
                select: {
                  name: true,
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          action: true,
                          subject: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            const cleanedUser = {
              id: user.id,
              email: user.email,
              role: {
                name: user.role.name,
                permissions: user.role.permissions.map(
                  (permission) => permission.permission
                ),
              },
            };

            return cleanedUser;
          }
        }

        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt", updateAge: 0 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.id) return session;

      session.user = {
        ...session.user,
        id: token.id.toString(), // Convert the id to a string
        email: token.email ?? "", // Use nullish coalescing operator to provide a default value
        role: token.role as {
          name: string;
          permissions: { action: string; subject: string }[];
        },
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
