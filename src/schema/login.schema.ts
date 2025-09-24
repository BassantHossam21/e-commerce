import * as z from "zod";


export const loginSchema = z
  .object({
    email: z.email("Please enter a valid email")
    .nonempty("Email is required"),
      
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    });
  
  


  export type loginSchemaType =z.infer<typeof loginSchema >