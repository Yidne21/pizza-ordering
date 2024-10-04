"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";

export async function filterOrderByResturantId({
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

  const where: any = {
    pizza: {
      resturantId: resturantRole.resturantId, // Filter orders by the restaurant ID
    },
  };

  // Build dynamic filters based on provided parameters
  if (status) {
    where.status = { contains: status, mode: "insensitive" };
  }

  if (customerPhone) {
    where.customer = {
      phone: { contains: customerPhone, mode: "insensitive" },
    };
  }

  if (pizzaName) {
    where.pizza.name = { contains: pizzaName, mode: "insensitive" };
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

export async function fetchOrderByCustomerId() {
  const requiredAction = "view";
  const requiredSubject = "ownOrderHistory";

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
    // Fetch the orders by customer ID
    const orders = await prisma.order.findMany({
      where: { customerId: session.user.id },
      include: {
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
      name: order.pizza.name,
      description: order.pizza.PizzaTopping.map(
        (topping) => topping.topping.name
      ).join(", "),
      price: order.total,
      image: order.pizza.photoUrl,
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
