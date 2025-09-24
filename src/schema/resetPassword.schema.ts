// src/schema/resetPassword.schema.ts
import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Enter a valid email").nonempty("Email is required"),
    newPassword: z.string().min(6, "Password must be at least 6 chars").nonempty("New password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
