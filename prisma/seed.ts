// seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
      resturantId: resturant.id,
    },
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
      resturantId: resturant.id
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


  // Example Toppings for the above resturant
  const toppings = [
    { name: "Pepperoni" },
    { name: "Mushrooms" },
    { name: "Onions" },
    { name: "Sausage" },
    { name: "Bacon" },
    { name: "Extra cheese" },
    { name: "Black olives" },
    { name: "Green peppers" },
    { name: "Pineapple" },
    { name: "Spinach" },
  ];

await prisma.topping.createMany({
    data: toppings.map((topping) => ({
      resturantId: resturant.id,
      name: topping.name,
    })),
  });

  // roles might be created by superAdmin

  await prisma.role.createMany({
    data: [
      {
        name: "kitchenManager",
        resturantId: resturant.id,
      },
      {
        name: "deliveryManager",
        resturantId: resturant.id,
      },
      {
        name: "chef",
        resturantId: resturant.id,
      },
      {
        name: "manager",
        resturantId: resturant.id,
      },
      {
        name: "reception",
        resturantId: resturant.id,
      },
    ],
  });

  //permissions might be created by superAdmin

  const permissions = [
    {
      action: "read",
      subject: "roles",
    },
    {
      action: "create",
      subject: "role",
    },
    {
      action: "update",
      subject: "role",
    },
    {
      action: "delete",
      subject: "role",
    },

    {
      action: "read",
      subject: "users",
    },
    {
      action: "create",
      subject: "user",
    },
    {
      action: "update",
      subject: "user",
    },
    {
      action: "delete",
      subject: "user",
    },

    {
      action: "read",
      subject: "toppings",
    },
    {
      action: "create",
      subject: "topping",
    },
    {
      action: "update",
      subject: "topping",
    },
    {
      action: "delete",
      subject: "topping",
    },

    {
      action: "read",
      subject: "orders",
    },
    {
      action: "update",
      subject: "order",
    },
    {
      action: "delete",
      subject: "order",
    },

    {
      action: "read",
      subject: "orderHistory",
    },
    {
      action: "update",
      subject: "orderStatus",
    },

    {
      action: "read",
      subject: "menus",
    },
    {
      action: "create",
      subject: "menu",
    },
    {
      action: "update",
      subject: "menu",
    },
    {
      action: "delete",
      subject: "menu",
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
