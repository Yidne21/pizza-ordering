"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, OrderStatus, RoleStatus, UserStatus, } from "@prisma/client";
import { Role } from "@/app/dashboard/roles/role-table-column";
import { User } from "@/app/dashboard/users/user-table-column";
import { imageUploader } from "./fileUpload";
import { PermissionType, RoleType, UserType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";


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

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }
  const resturantId = session.user.resturantId;
  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.read, Subjects.orders) || !resturantId) {
    redirect("/403");
  }

  
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
      id: order.id,
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
  status: string;
}) {

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.update, Subjects.orderStatus)) {
    redirect("/403");
  }

  const newStatus = status === "DELIVERED" ? OrderStatus.DELIVERED : status === "PREPARING" ? OrderStatus.PREPARING : OrderStatus.READY;


  console.log(newStatus);
  try {
    // Update the order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    revalidatePath('/dashboard/orders', 'page');

    return { success: true, message: "Order status updated successfully" };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: "Could not update order status" };
  }
}

// menu
export async function addMenu(formData: FormData) {
  try {

    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect('/login')
    }
    const resturantId = session.user.resturantId;
    
    const { role } = session.user;
  
    const ability = createAbility(role.permissions);
  
    if (!ability.can(Actions.create, Subjects.menu) || !resturantId) {
      redirect("/403");
    }


    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const toppings = formData.get("toppings") as string;
    const imageFile = formData.get("image") as File;

    // Upload the image and get the URL
    const imageUrl = await imageUploader(imageFile, "pizza/images");
    if (!imageUrl) {
      throw new Error("Failed to upload pizza image");
    }

    const parsedToppings = JSON.parse(toppings) as string[]; // Parse toppings

    // Create or find existing toppings
    const createdToppings = await Promise.all(
      parsedToppings.map(async (toppingName) => {
        // Check if topping exists
        const existingTopping = await prisma.topping.findUnique({
          where: { name: toppingName }
        });

        // If it exists, return it; otherwise, create a new one
        if (existingTopping) {
          return existingTopping;
        } else {
          return await prisma.topping.create({
            data: { name: toppingName }
          });
        }
      })
    );

    // Create the new pizza in the database
    const newPizza = await prisma.pizza.create({
      data: {
        name,
        price,
        photoUrl: imageUrl,
        resturant: {
          connect: { id: resturantId }, // Link the pizza to the restaurant
        },
      },
    });

    await Promise.all(
      createdToppings.map(async (topping) => {
        await prisma.pizzaTopping.create({
          data: {
            pizza: { connect: { id: newPizza.id } }, // Link to pizza
            topping: { connect: { id: topping.id } }, // Link to topping
          },
        });
      })
    );

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
  status?: RoleStatus;
  global?: string;
}) {
  try {

    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect('/login')
    }
    const resturantId = session.user.resturantId;
    
    const { role } = session.user;
  
    const ability = createAbility(role.permissions);
  
    if (!ability.can(Actions.read, Subjects.roles) || !resturantId) {
      redirect("/403");
    }

    // Prepare the filters
    const whereFilters: Prisma.RoleWhereInput = {
      resturantId: resturantId,
      type: RoleType.RESTURANT,
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
                id: true,
                action: true,
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order (latest first)
      },
    });
    


    // Format the result to match your expected output
    const formattedRoles: Role[] = roles.map(role => ({
      id: role.id,
      name: role.name,
      createdAt: role.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      permissions: role.permissions.map(rp => {
        return {
        roleId: role.id,
        id: rp.permission.id,
        action: rp.permission.action,
        subject: rp.permission.subject,
        }
      }),
      status: role.status,
    }));

    return { roles: formattedRoles };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { roles: [] }; // Return an empty array on error
  }
}


// roles
export async function addRole(formData: FormData) {
  const name = formData.get("name") as string;
  const permissions = formData.get("permissions") as string;
  const parsedPermissions: string[] = JSON.parse(permissions);

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }
  const resturantId = session.user.resturantId;
  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.create, Subjects.role) || !resturantId) {
    redirect("/403");
  }


  try {
    // Create the new role
    const role = await prisma.role.create({
      data: {
        name: name,
        resturantId: resturantId,
        type: RoleType.RESTURANT
      },
    });

    // Associate the permissions (permission IDs) with the created role in the rolePermission table
    const rolePermissions = parsedPermissions.map((permissionId) => {
      return prisma.roleOnPermission.create({
        data: {
          roleId: role.id,
          permissionId: permissionId,
        },
      });
    });

    // Execute all rolePermission creations
    await Promise.all(rolePermissions);
    revalidatePath('/dashboard/roles', 'page');


    return { success: true, message: "Role added successfully" };
  } catch (error) {
    console.error("Error adding Role:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function updateRole(formData: FormData) {
  const name = formData.get("name") as string;
  const permissions = formData.get("permissions") as string;
  const roleId = formData.get("roleId") as string;
  const parsedPermissions: string[] = JSON.parse(permissions);

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }
  const resturantId = session.user.resturantId;
  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.update, Subjects.role) || !resturantId) {
    redirect("/403");
  }

  try {
    // Step 1: Update the role's name and restaurant if provided
    await prisma.role.update({
      where: {
        id: roleId,
        resturantId,
      },
      data: {
        name,
      },
    });

    // Step 2: Fetch the current permissions linked to this role
    const existingPermissions = await prisma.roleOnPermission.findMany({
      where: { roleId },
      select: { permissionId: true },
    });

    const existingPermissionIds = existingPermissions.map((rp) => rp.permissionId);

    // Step 3: Unlink any permissions that are no longer present in parsedPermissions
    const permissionsToUnlink = existingPermissionIds.filter(
      (id) => !parsedPermissions.includes(id)
    );

    if (permissionsToUnlink.length > 0) {
      await prisma.roleOnPermission.deleteMany({
        where: {
          roleId,
          permissionId: { in: permissionsToUnlink },
        },
      });
    }

    // Step 4: Link new permissions that are not currently linked to the role
    const permissionsToLink = parsedPermissions.filter(
      (id) => !existingPermissionIds.includes(id)
    );

    if (permissionsToLink.length > 0) {
      const roleOnPermissionData = permissionsToLink.map((permissionId) => ({
        roleId,
        permissionId,
      }));

      await prisma.roleOnPermission.createMany({
        data: roleOnPermissionData,
      });
    }

    // Revalidate the path to update the dashboard roles view
    revalidatePath('/dashboard/roles', 'page');

    return { success: true, message: "Role updated successfully" };
  } catch (error) {
    console.error("Error updating Role:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function updateRoleStatus({status, roleId}: {status: string; roleId: string;}) {
  try {

    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect('/login')
    }    
    const { role } = session.user;
  
    const ability = createAbility(role.permissions);
  
    if (!ability.can(Actions.update, Subjects.role)) {
      redirect("/403");
    }

    const roleStatus = status === "ACTIVE" ? RoleStatus.ACTIVE : RoleStatus.INACTIVE;
    await prisma.role.update({
      where: {
        id: roleId
      },
      data: {
        status: roleStatus
      }
    })

    revalidatePath("/dashboard/orders", "page");
    return { success: true, message: "role status updated successfully" };
  } catch (error) {
    console.error("Error updating role status:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function deleteRole({roleId}: {roleId: string;}) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.delete, Subjects.role)) {
    redirect("/403");
  }

  try {

    await prisma.role.delete({
      where: {
        id: roleId
      }
    })
    revalidatePath('/dashboard/orders', 'page');
    return { success: true, message: "Role deleted successfully" };
  } catch (error) {
      // Check if it's a Prisma error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2003 indicates a foreign key constraint violation
        if (error.code === 'P2003') {
          return { success: false, message: "Cannot delete role: It is given to users delete that users first." };
        }
        // P2025 indicates that the record doesn't exist
        if (error.code === 'P2025') {
          return { success: false, message: "Role not found or already deleted." };
        }
      }

    console.error("Error adding User:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getResturantPermission() {
  try {
    const permissions = await prisma.permission.findMany({
      where: {
        type: PermissionType.RESTURANT
      },
      select: {
        id: true,
        action: true,
        subject: true,
      }
    })
    return { success: true, permissions };
  } catch (error) {
    console.error("Error getting permissions :", error);
    return { success: false, message: "Something went wrong", permissions: [] };
  }
}

export async function getResturantRoles() {
  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }
  const resturantId = session.user.resturantId;
  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.read, Subjects.roles) || !resturantId) {
    redirect("/403");
  }
  try {

    const roles = await prisma.role.findMany({
      where: {
        type: RoleType.RESTURANT,
        resturantId
      },
      select: {
        id: true,
        name: true,
      }
    })
    return { success: true, roles };
  } catch (error) {
    console.error("Error getting roles :", error);
    return { success: false, message: "Something went wrong", roles: [] };
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
) {
  try {

    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect('/login')
    }
    const resturantId = session.user.resturantId;
    
    const { role } = session.user;
  
    const ability = createAbility(role.permissions);
  
    if (!ability.can(Actions.read, Subjects.users) || !resturantId) {
      redirect("/403");
    }


    const whereFilters: Prisma.UserWhereInput = {
      resturantId: resturantId,
      type: UserType.RESTURANT,
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
    return { users: [] }; // Return an empty array in case of error
  }
};

export async function addUser(formData: FormData) {

  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }
  const resturantId = session.user.resturantId;
  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.create, Subjects.user) || !resturantId) {
    redirect("/403");
  }




  try {
   const name = formData.get("name") as string;
   const email = formData.get("email") as string;
   const location = formData.get("location") as string;
   const phone = formData.get("phoneNumber") as string;
   const role = formData.get("role") as string;

   const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      name,
      email,
      location,
      password: hashedPassword,
      phone,
      type: UserType.RESTURANT,
      role: { connect: { id: role} },
      resturant: {connect: {id: resturantId}}
    }
  })

  revalidatePath('/dashboard/users', 'page');
    return { success: true, message: "User added successfully" };
  } catch (error) {
    console.error("Error adding User:", error);
    return { success: false, message: "Something went wrong" };
  }
}


export async function updateUserStatus({status, userId}: {status: string; userId: string;}) {
  try {

    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect('/login')
    }    
    const { role } = session.user;
  
    const ability = createAbility(role.permissions);
  
    if (!ability.can(Actions.update, Subjects.user)) {
      redirect("/403");
    }

    const userStatus = status === "ACTIVE" ? UserStatus.ACTIVE : UserStatus.INACTIVE;
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        status: userStatus
      }
    })

    revalidatePath("/dashboard/users", "page");
    return { success: true, message: "user status updated successfully" };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function deleteUser({userId}: {userId: string;}) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect('/login')
  }  
  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.delete, Subjects.user)) {
    redirect("/403");
  }

  try {

    await prisma.user.delete({
      where: {
        id: userId
      }
    })
    revalidatePath('/dashboard/users', 'page');
    return { success: true, message: "user deleted successfully" };
  } catch (error) {
      // Check if it's a Prisma error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2025 indicates that the record doesn't exist
        if (error.code === 'P2025') {
          return { success: false, message: "user not found or already deleted." };
        }
      }

    console.error("Error adding User:", error);
    return { success: false, message: "Something went wrong" };
  }
}


export async function getToppingsByPizzaId(pizzaId: string) {
  try {

    const toppings = await prisma.pizzaTopping.findMany({
      where: {
        pizzaId: pizzaId
      },
      include: {
        topping: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return { success: true, toppings };
  } catch (error) {
    console.error("Error fetching toppings:", error);
    return { success: false, message: "Failed to fetch toppings" };
  } finally {
    await prisma.$disconnect();
  }
}
