"use server";

import { prisma } from "./prisma";
import { getServerSession } from "next-auth/next";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { Actions, Subjects } from "@/utils/permissionSetting";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/login");
  }

  const customerId = session.user.id;
  const { role } = session.user;
  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.create, Subjects.order) || !customerId) {
    return redirect("/403");
  }

  try {
    // Extract and parse toppings
    const toppingsString = formData.get("toppings") as string;
    const toppingsArray = JSON.parse(toppingsString);

    // Create a new order and connect toppings
    const order = await prisma.order.create({
      data: {
        quantity: Number(formData.get("quantity")),
        pizzaId: formData.get("pizzaId") as string,
        total: Number(formData.get("total")),
        customerId,
        OrderTopping: {
          create: toppingsArray.map((toppingId: string) => ({
            topping: { connect: { id: toppingId } },
          })),
        },
      },
    });

    revalidatePath("/orders", "page");
    return { success: true, message: "Order placed successfully", order };
  } catch (error) {
    console.log("Error creating order:", error);
    return { success: false, message: "Could not place order" };
  }
}

export async function fetchOrderByCustomerId() {
  const session = await getServerSession(authOptions);

  const customerId = session?.user.id;

  if (!customerId) {
    return redirect("/login");
  }

  const userPermissions = session.user.role.permissions;

  // Create ability instance based on user's permissions
  const ability = createAbility(userPermissions);

  // Redirect if user doesn't have permission to filter orders
  if (!ability.can(Actions.read, Subjects.orderHistory)) {
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
      id: order.id,
      name: order.pizza.name,
      toppings: order.pizza.PizzaTopping.map(
        (topping) => topping.topping.name
      ).join(", "),
      price: order.total,
      image: order.pizza.photoUrl,
      status: order.status,
    }));

    return { sucess: true, orders: formattedOrders };
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export async function fetchPizzas(searchQuery = "") {
  try {
    // Fetch pizzas along with the restaurant and toppings data
    const pizzas = await prisma.pizza.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          {
            PizzaTopping: {
              some: {
                topping: {
                  name: { contains: searchQuery, mode: "insensitive" },
                },
              },
            },
          },
        ],
      },
      include: {
        resturant: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
        PizzaTopping: {
          include: {
            topping: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Map the data to match the format used in your component
    const formattedPizzas = pizzas.map((pizza) => ({
      id: pizza.id,
      name: pizza.name,
      toppings: pizza.PizzaTopping.map((pt) => pt.topping.name).join(", "), // Join all toppings into a string
      price: pizza.price,
      image: pizza.photoUrl,
      resturant: pizza.resturant.name,
      logo: pizza.resturant.logoUrl,
    }));

    return { success: true, pizzas: formattedPizzas };
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    return { success: true, pizzas: [] };
  }
}

export async function getPizzaDetails(pizzaId: string) {
  try {
    const pizza = await prisma.pizza.findUnique({
      where: { id: pizzaId },
      include: {
        PizzaTopping: {
          include: {
            topping: true,
          },
        },
      },
    });

    if (!pizza) {
      throw new Error(`Pizza with ID ${pizzaId} not found.`);
    }
    // Map the toppings to the desired structure
    const orderDetails = {
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      toppings: pizza.PizzaTopping.map((pt) => ({
        name: pt.topping.name,
        id: pt.topping.id,
      })),
      images: [pizza.photoUrl],
    };

    return orderDetails;
  } catch (error) {
    console.error("Error fetching pizza details:", error);
  }
}
