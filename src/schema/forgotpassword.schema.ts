import * as z from "zod";


export const forgotpasswordSchema = z
  .object({
    email: z.email("Please enter a valid email")
    .nonempty("Email is required"),
      
    });
  export type ForgotPasswordSchemaType =z.infer<typeof forgotpasswordSchema >