import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
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
                  id: false,
                  name: true,
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          id: false,
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
});
