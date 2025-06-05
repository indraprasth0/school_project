import { z } from "zod";

export const SettingsSchema = z.object({
  name: z.string().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum(["admin", "student", "teacher", "clerk", "principal", "parent", "supervisor", "superAdmin"]),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
}).refine((data) => {
  if (data.password && !data.newPassword) return false;
  if (data.newPassword && !data.password) return false;
  return true;
}, {
  message: "Both old and new passwords are required!",
  path: ["password"]
});


export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
  });
  
  export const ResetSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
  });
  
  export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    code: z.string().optional(), // For 2FA
  });
  
  export const RegisterSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    name: z.string().min(1, { message: "Name is required" }),
  });
  