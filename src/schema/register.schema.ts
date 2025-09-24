import * as z from "zod";


export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name field can't be empty")
      .min(2, "Name must be at least 2 characters")
      .max(10, "Name must be at most 10 characters"),

    email: z.email("Please enter a valid email")
    .nonempty("Email is required"),
      
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),

    rePassword: z.string().nonempty("Please confirm your password"),

    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });


  export type registerSchemaType=z.infer<typeof registerSchema >