import { z } from "zod";

export enum UserRole {
  customer = "customer",
  superAdmin = "superAdmin",
}

export const customerSignUp = z
  .object({
    name: z.string().min(2, {
      message: "please enter your name",
    }),
    email: z.string().email({
      message: "please enter valid email",
    }),
    location: z.string().min(2, {
      message: "please enter location",
    }),
    phoneNumber: z.string().min(6, {
      message: "please enter phone Number",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(2, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const managerSignUpSchema = z
  .object({
    name: z.string().min(2, {
      message: "please enter name",
    }),
    email: z.string().email({
      message: "please enter valid email",
    }),
    location: z.string().min(2, {
      message: "please enter location",
    }),
    phoneNumber: z.string().min(6, {
      message: "please enter phone Number",
    }),
    logo: z
      .any()
      .optional()
      .refine(
        (value) =>
          typeof value === "string" ||
          (value instanceof FileList && value.length > 0),
        {
          message: "logo is required",
        }
      ),
    restaurantName: z.string().min(2, {
      message: "please enter restaurant name",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(2, {
      message: "Password must be at least 6 characters long",
    }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "please enter valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const addMenuSchema = z.object({
  name: z.string().min(1, { message: "menu name is required!" }),
  price: z.number().min(1, { message: "price is required!" }),
  toppings: z.array(z.string()).min(1, { message: "topping is required!" }),
  logo: z
    .any()
    .optional()
    .refine(
      (value) =>
        typeof value === "string" ||
        (value instanceof FileList && value.length > 0),
      {
        message: "Image is required",
      }
    ),
});

export const orderSchema = z.object({
  toppings: z.array(z.string()).min(1, { message: "topping is required!" }),
});

export const addRoleSchema = z.object({
  name: z.string().min(1, { message: "role name is required!" }),
  permissions: z
    .array(z.string())
    .min(1, { message: "permissions is required!" }),
});

export const addUserSchema = z.object({
  name: z.string().min(2, {
    message: "please enter name",
  }),
  email: z.string().email({
    message: "please enter valid email",
  }),
  location: z.string().min(2, {
    message: "please enter location",
  }),
  phoneNumber: z.string().min(6, {
    message: "please enter phone Number",
  }),
  role: z.string().min(2, {
    message: "please select role",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
