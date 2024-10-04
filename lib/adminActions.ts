"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, OrderStatus, RoleStatus, } from "@prisma/client";
import { Role } from "@/app/dashboard/roles/role-table-column";
import { User } from "@/app/dashboard/users/user-table-column";
import { imageUploader } from "./fileUpload";



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
}, resturantId: string) {

  console.log(resturantId, "###########");

  const where: Prisma.OrderWhereInput = {
    pizza: {
      resturantId: resturantId, // Filter orders by the restaurant ID
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
  orderId: string;
  status: "READY" | "PREPARING" | "DELIVERED";
}) {


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
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string); 
    // const toppings = formData.getAll("toppings") as string[];
    const resturantId =formData.get("resturantId") as string;
    
    const imageFile = formData.get("image") as File;

    // Upload the image and get the URL
    const imageUrl = await imageUploader(imageFile, "pizza/images");
    if (!imageUrl) {
      throw new Error("Failed to upload pizza image");
    }

    
    // Get topping IDs (assuming the toppings were already created in the database)
    // const toppingIds = toppings.map(toppingId => ({ toppingId: parseInt(toppingId) }));

    // Create the new pizza in the database
    const newPizza = await prisma.pizza.create({
      data: {
        name,
        price,
        photoUrl: imageUrl, // Use the uploaded image URL
        resturant: {
          connect: { id: resturantId } // Link the pizza to the resturant
        },
      }
    });

    return { success: true, message: "Menu added successfully", pizza: newPizza };
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
}, restaurantId: string) {
  try {

    // Prepare the filters
    const whereFilters: Prisma.RoleWhereInput = {
      resturantId: restaurantId,
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
  resturantId: string,
){
try {
  const whereFilters: Prisma.UserWhereInput = {
   resturantId:resturantId,
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

export async function getToppingsByResturantId(resturantId: string) {
  try {
  
    const toppings = await prisma.topping.findMany({
      where: {
        resturantId: resturantId
      },
      select: {
        id: true,
        name: true,
      }
    });

    // Return the toppings
    return { success: true, toppings };
  } catch (error) {
    console.error("Error fetching toppings:", error);
    return { success: false, message: "Failed to fetch toppings" };
  } finally {
    await prisma.$disconnect();
  }
}
