"use server";

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function managerSignUpAction(formData: FormData) {
  try {
    const role = await prisma.role.findFirst({ where: { name: "superAdmin" } });

    if (!role) {
      return { success: false, message: "Role not found" };
    }

    const hashedPassword = await bcrypt.hash(
      formData.get("password") as string,
      10
    );

    await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: hashedPassword,
        role: { connect: { id: role.id } },
        phone: formData.get("phoneNumber") as string,
        location: formData.get("location") as string,
      },
    });

    return { success: true, message: "Manager added successfully" };
  } catch (error) {
    console.error("Error adding Manager:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function customerSignUpAction(formData: FormData) {
  try {
    const role = await prisma.role.findFirst({ where: { name: "customer" } });

    if (!role) {
      return { success: false, message: "Role not found" };
    }

    const hashedPassword = await bcrypt.hash(
      formData.get("password") as string,
      10
    );

    await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: hashedPassword,
        role: { connect: { id: role.id } },
        phone: formData.get("phoneNumber") as string,
        location: formData.get("location") as string,
      },
    });
    return { success: true, message: "Customer added successfully" };
  } catch (error) {
    console.error("Error adding Customer:", error);
    return { success: false, message: "Something went wrong" };
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
