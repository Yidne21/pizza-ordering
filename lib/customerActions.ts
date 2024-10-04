"use server";

import { prisma } from "./prisma";
import { getServerSession } from "next-auth/next";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  const requiredAction = "create";
  const requiredSubject = "order";
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
    // Extract and parse toppings
    const toppingsString = formData.get("toppings") as string;
    const toppingsArray = JSON.parse(toppingsString);

    console.log("Toppings array:", toppingsString);

    // Create a new order
    const order = await prisma.order.create({
      data: {
        quantity: Number(formData.get("quantity")),
        customerId: formData.get("customerId") as string,
        pizzaId: formData.get("pizzaId") as string,
        total: Number(formData.get("total")),
        toppings: toppingsArray,
      },
    });

    return { success: true, message: "Order placed successfully", order };
  } catch (error) {
    console.log("Error creating order:", error);
    return { success: false, message: "Could not place order" };
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
