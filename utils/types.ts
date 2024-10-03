import { z } from "zod";
import {
  addMenuSchema,
  LoginSchema,
  customerSignUp,
  addRoleSchema,
  addUserSchema,
  managerSignUpSchema,
  orderSchema,
} from "./schema";

export type customerSignUpFormTypes = z.infer<typeof customerSignUp>;
export type LoginFormTypes = z.infer<typeof LoginSchema>;
export type addMenuFormTypes = z.infer<typeof addMenuSchema>;
export type addRoleFormTypes = z.infer<typeof addRoleSchema>;
export type addUserFormTypes = z.infer<typeof addUserSchema>;
export type managerSignUpFormTypes = z.infer<typeof managerSignUpSchema>;
export type orderFormTypes = z.infer<typeof orderSchema>;
