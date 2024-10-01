import { z } from "zod";
import {
  addMenuSchema,
  LoginSchema,
  registerSchema,
  addRoleSchema,
  addUserSchema,
} from "./schema";

export type RegisterFormTypes = z.infer<typeof registerSchema>;
export type LoginFormTypes = z.infer<typeof LoginSchema>;
export type addMenuFormTypes = z.infer<typeof addMenuSchema>;
export type addRoleFormTypes = z.infer<typeof addRoleSchema>;
export type addUserFormTypes = z.infer<typeof addUserSchema>;
