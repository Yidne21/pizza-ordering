import { PrismaClient } from "@prisma/client";
import { interpolate } from "./interpolate";

const prisma = new PrismaClient();

// eslint-disable-next-line
export async function findBy(where: any) {
  const user = await prisma.user.findUnique({
    where,
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  // Interpolate each permission in the user's role
  const interpolatedPermissions = user?.role.permissions.map((rp) =>
    interpolate(rp.permission, { user })
  );

  return {
    id: user?.id,
    email: user?.email,
    role: user?.role.name,
    password: user?.password,
    permissions: interpolatedPermissions,
  };
}
