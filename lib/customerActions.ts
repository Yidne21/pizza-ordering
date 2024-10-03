import { prisma } from "./prisma";

export async function orderActions(formData: FormData) {
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
