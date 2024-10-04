import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Define the User interface
interface User {
  id: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: {
      action: string;
      subject: string;
    }[];
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // Validate the input format
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          // If validation fails, return a custom error message
          throw new Error("Invalid email or password format.");
        }

        const { email, password } = parsedCredentials.data;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            role: {
              select: {
                id: true,
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

        // If no user found with the email
        if (!user) {
          throw new Error("Email or password doesn't match.");
        }

        // Compare passwords
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error("Email or password doesn't match.");
        }

        // Return the user object if everything is fine
        return {
          id: user.id,
          email: user.email,
          role: {
            id: user.role.id,
            name: user.role.name,
            permissions: user.role.permissions.map(
              (permission) => permission.permission
            ),
          },
        };
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

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
