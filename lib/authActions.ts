"use server";

import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { imageUploader } from "./fileUpload";

export async function managerSignUpAction(formData: FormData) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: formData.get("email") as string },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    let role = await prisma.role.findFirst({ where: { name: "superAdmin" } });

    if (!role) {
      role = await prisma.role.create({ data: { name: "superAdmin" } });
    }

    const hashedPassword = await bcrypt.hash(
      formData.get("password") as string,
      10
    );

    const logoFile = formData.get("logo") as File;

    const logoUrl = await imageUploader(logoFile, "restaurants/logos");
    if (!logoUrl) {
      throw new Error("Failed to upload logo");
    }

    const superAdmin = await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: hashedPassword,
        phone: formData.get("phoneNumber") as string,
        location: formData.get("location") as string,
        role: { connect: { id: role.id } },
      },
    });

    await prisma.resturant.create({
      data: {
        name: formData.get("restaurantName") as string,
        location: formData.get("location") as string,
        phone: formData.get("phoneNumber") as string,
        email: formData.get("email") as string,
        logoUrl: logoUrl,
        superAdminId: superAdmin.id,
      },
    });

    return {
      success: true,
      message: "Manager and restaurant added successfully",
    };
  } catch (error) {
    console.error("Error adding Manager and restaurant:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function customerSignUpAction(formData: FormData) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: formData.get("email") as string },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    let role = await prisma.role.findFirst({ where: { name: "customer" } });

    if (!role) {
      role = await prisma.role.create({ data: { name: "customer" } });
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
