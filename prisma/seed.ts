// seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PermissionType, RoleType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const resturant = await prisma.resturant.create({
    data: {
      name: "Pizza Place",
      location: "123 Main St",
      phone: "1234567890",
      email: "pizza@gmail.com",
      logoUrl: "https://placehold.co/400",
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: "superAdmin",
    },
  });

  const toppings = [
    "Cheese",
    "Pepperoni",
    "Mushrooms",
    "Onions",
    "Sausage",
    "Bacon",
    "Extra cheese",
    "Black olives",
  ];

  await prisma.topping.createMany({
    data: toppings.map((topping) => ({
      name: topping,
      resturantId: resturant.id,
    })),
  });

  const hashedAdminPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedAdminPassword,
      name: "Admin User",
      phone: "1234567890",
      location: "Admin Location",
      roleId: adminRole.id,
      resturantId: resturant.id,
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: "customer",
    },
  });

  // default permissions

  const viewPizzaPermission = await prisma.permission.create({
    data: {
      action: "read",
      subject: "menu",
    },
  });

  const viewOrderHistory = await prisma.permission.create({
    data: {
      action: "read",
      subject: "orderHistory",
    },
  });

  const createOrder = await prisma.permission.create({
    data: {
      action: "create",
      subject: "order",
    },
  });

  const viewPizzasPermission = await prisma.permission.create({
    data: {
      action: "read",
      subject: "menus",
    },
  });

  // superAdmin permissions

  const superAdminPermissions = await prisma.permission.create({
    data: {
      action: "manage",
      subject: "all",
    },
  });

  // Associate default Permissions with default Roles
  await prisma.roleOnPermission.createMany({
    data: [
      {
        roleId: adminRole.id,
        permissionId: superAdminPermissions.id,
      },
      {
        roleId: userRole.id,
        permissionId: viewPizzaPermission.id,
      },
      {
        roleId: userRole.id,
        permissionId: viewOrderHistory.id,
      },
      {
        roleId: userRole.id,
        permissionId: createOrder.id,
      },
      {
        roleId: userRole.id,
        permissionId: viewPizzasPermission.id,
      },
    ],
  });

  // roles might be created by superAdmin

  await prisma.role.createMany({
    data: [
      {
        name: "kitchenManager",
        resturantId: resturant.id,
        type: RoleType.RESTURANT,
      },
      {
        name: "deliveryManager",
        resturantId: resturant.id,
        type: RoleType.RESTURANT,
      },
      {
        name: "chef",
        resturantId: resturant.id,
        type: RoleType.RESTURANT,
      },
      {
        name: "manager",
        resturantId: resturant.id,
        type: RoleType.RESTURANT,
      },
      {
        name: "reception",
        resturantId: resturant.id,
        type: RoleType.RESTURANT,
      },
    ],
  });

  //permissions might be created by superAdmin

  const permissions = [
    {
      action: "read",
      subject: "roles",
      type: PermissionType.RESTURANT,
    },
    {
      action: "create",
      subject: "role",
      type: PermissionType.RESTURANT,
    },
    {
      action: "update",
      subject: "role",
      type: PermissionType.RESTURANT,
    },
    {
      action: "delete",
      subject: "role",
      type: PermissionType.RESTURANT,
    },

    {
      action: "read",
      subject: "users",
      type: PermissionType.RESTURANT,
    },
    {
      action: "create",
      subject: "user",
      type: PermissionType.RESTURANT,
    },
    {
      action: "update",
      subject: "user",
      type: PermissionType.RESTURANT,
    },
    {
      action: "delete",
      subject: "user",
      type: PermissionType.RESTURANT,
    },

    {
      action: "read",
      subject: "orders",
      type: PermissionType.RESTURANT,
    },
    {
      action: "update",
      subject: "order",
      type: PermissionType.RESTURANT,
    },
    {
      action: "delete",
      subject: "order",
      type: PermissionType.RESTURANT,
    },
    {
      action: "update",
      subject: "orderStatus",
      type: PermissionType.RESTURANT,
    },

    {
      action: "read",
      subject: "menus",
      type: PermissionType.RESTURANT,
    },
    {
      action: "create",
      subject: "menu",
      type: PermissionType.RESTURANT,
    },
    {
      action: "update",
      subject: "menu",
      type: PermissionType.RESTURANT,
    },
    {
      action: "delete",
      subject: "menu",
      type: PermissionType.RESTURANT,
    },
  ];

  await prisma.permission.createMany({
    data: permissions.map((permission) => ({
      ...permission,
    })),
  });

  // Example Customer User
  const hashedUserPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "customer@example.com",
      password: hashedUserPassword,
      name: "customer User",
      phone: "0987654321",
      location: "User Location",
      roleId: userRole.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
