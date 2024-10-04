"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Prisma, OrderStatus, RoleStatus, } from "@prisma/client";
import { Role } from "@/app/dashboard/roles/role-table-column";
import { User } from "@/app/dashboard/users/user-table-column";



// orders

export async function filterOrders({
  status,
  customerPhone,
  pizzaName,
  global,
}: {
  status?: string;
  customerPhone?: string;
  pizzaName?: string;
  global?: string;
}) {
  const requiredAction = "filter";
  const requiredSubject = "Order";

  // Get session and user data
  const session = await getServerSession();
  if (!session?.user) {
    return redirect("/login");
  }

  console.log(session);
  const userPermissions = session.user.role.permissions;

  // Create ability instance based on user's permissions
  const ability = createAbility(userPermissions);

  // Redirect if user doesn't have permission to filter orders
  if (!ability.can(requiredAction, requiredSubject)) {
    return redirect("/403");
  }

  let resturantRole;

  try {
    // Fetch the resturantId associated with the user's role
    resturantRole = await prisma.resturantRole.findFirst({
      where: { roleId: session.user.role.id },
      select: { resturantId: true },
    });

    if (!resturantRole) {
      throw new Error(
        "User does not have a role associated with any restaurant."
      );
    }
  } catch (error) {
    console.error("Error fetching restaurant role:", error);
    throw new Error("Could not fetch restaurant role. Please try again later.");
  }

  const where: Prisma.OrderWhereInput = {
    pizza: {
      resturantId: resturantRole.resturantId, // Filter orders by the restaurant ID
    },
  };

  if (status) {
    where.status = { equals: status as OrderStatus }; // Correct enum comparison
  }

// Filter by customer phone (use contains)
if (customerPhone) {
  where.customer = {
    phone: { contains: customerPhone, mode: "insensitive" },
  };
}

// Filter by pizza name (use contains)
if (pizzaName) {
  where.pizza = {
    name: { contains: pizzaName, mode: "insensitive" },
  };
}

  // Apply a global filter across customer phone and pizza name fields
  if (global) {
    where.OR = [
      { customer: { phone: { contains: global, mode: "insensitive" } } },
      { pizza: { name: { contains: global, mode: "insensitive" } } },
    ];
  }

  let orders;

  try {
    // Fetch the orders matching the filters
    orders = await prisma.order.findMany({
      where,
      include: {
        customer: {
          select: { phone: true },
        },
        pizza: {
          include: {
            PizzaTopping: {
              select: {
                topping: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transform the orders into the desired format
    const formattedOrders = orders.map((order) => ({
      pizza: order.pizza.name,
      toppings: order.pizza.PizzaTopping.map((topping) => topping.topping.name),
      quantity: order.quantity,
      customer_no: order.customer.phone,
      created_at: order.createdAt.toISOString(),
      status: order.status,
    }));

    return { orders: formattedOrders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Could not fetch orders. Please try again later.");
  }
}

export async function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: number;
  status: "READY" | "PREPARING" | "DELIVERED";
}) {
  const requiredAction = "update";
  const requiredSubject = "OrderStatus";

  // Get session and user data
  const session = await getServerSession();
  if (!session?.user) {
    return redirect("/login");
  }

  const userPermissions = session.user.role.permissions;

  // Create ability instance based on user's permissions
  const ability = createAbility(userPermissions);

  // Redirect if user doesn't have permission to filter orders
  if (!ability.can(requiredAction, requiredSubject)) {
    return redirect("/403");
  }

  try {
    // Update the order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return { success: true, message: "Order status updated successfully" };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: "Could not update order status" };
  }
}



// menu
export async function addMenu(formData: FormData) {
  try {
    // Example Cloudinary file upload logic or any other form data processing
    // const response = await cloudinary.uploader.upload(...);

    console.log("Menu data:", formData);

    // Simulate success response (you would replace this with actual API logic)
    return { success: true, message: "Menu added successfully" };
  } catch (error) {
    console.error("Error adding menu:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function filterRoles({
  name,
  status,
  global
}: {
  name?: string;
  status?: RoleStatus; // Change to RoleStatus type
  global?: string;
}) {
  try {
    const restaurantId = "1334jfsfsdj";

    

    // Prepare the filters
    const whereFilters: Prisma.RoleWhereInput = {
      ResturantRole: {
        some: {
          resturantId: restaurantId,
        },
      },
      ...(status ? { status } : {}), // Ensure status is of type RoleStatus
      ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}), // Handle name filtering
    };

      // Apply a global filter across customer phone and pizza name fields
  if (global) {
    whereFilters.OR = [
      { name: { contains: global, mode: "insensitive" } },
    ];
  }

    const roles = await prisma.role.findMany({
      where: whereFilters,
      include: {
        permissions: {
          include: {
            permission: {
              select: {
                action: true,
                subject: true,
              },
            },
          },
        },
      },
    });

    // Format the result to match your expected output
    const formattedRoles: Role[] = roles.map(role => ({
      id: role.id,
      name: role.name,
      createdAt: role.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      permissions: role.permissions.map(rp => rp.permission.action), // Extract action names
      status: role.status,
    }));

    return { roles: formattedRoles };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { roles: [] }; // Return an empty array on error
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected
  }
}


// roles
export async function addRole(formData: FormData) {
  try {
    // Example Cloudinary file upload logic or any other form data processing
    // const response = await cloudinary.uploader.upload(...);

    console.log("Role data:", formData);

    // Simulate success response (you would replace this with actual API logic)
    return { success: true, message: "Role added successfully" };
  } catch (error) {
    console.error("Error adding Role:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// users
export async function filterUsers(
  {
    name,
    email,
    phone,
    global
  }: {
    name?: string;
    email?: string;
    phone?: string;
    global?: string;
  },
){
try {
  const resturantId = "jsdkfkdfkjkjkfsj343";
  const whereFilters: Prisma.UserWhereInput = {
    ResturantUser: {
      some: {
        resturantId: resturantId,
      },
    },
    ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
    ...(email ? { email: { contains: email, mode: 'insensitive' } } : {}),
    ...(phone ? { phone: { contains: phone, mode: 'insensitive' } } : {}),
    ...(global ? {
      OR: [ // Adding OR clause for global search
        { name: { contains: global, mode: 'insensitive' } },
        { email: { contains: global, mode: 'insensitive' } },
        { phone: { contains: global, mode: 'insensitive' } },
      ]
    } : {}),
  };

  // Fetch users based on the constructed filters
  const users = await prisma.user.findMany({
    where: whereFilters,
  });

  // Format the result to match your expected output
  const formattedUsers: User[] = users.map(user => ({
    id: user.id,
    name: user.name || '', // Handle potential null values
    email: user.email,
    phone: user.phone,
    status: user.status, // Assuming status is a UserStatus enum
  }));

  return { users: formattedUsers }; // Return the formatted array of users
} catch (error) {
  console.error("Error fetching users:", error);
  return {users: []}; // Return an empty array in case of error
}
};

export async function addUser(formData: FormData) {
  try {
    // Example Cloudinary file upload logic or any other form data processing
    // const response = await cloudinary.uploader.upload(...);

    console.log("User data:", formData);

    // Simulate success response (you would replace this with actual API logic)
    return { success: true, message: "User added successfully" };
  } catch (error) {
    console.error("Error adding User:", error);
    return { success: false, message: "Something went wrong" };
  }
}
