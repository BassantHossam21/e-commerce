import * as z from "zod";


export const checkoutSchema = z
  .object({
    details: z.string().nonempty("details can't be empty"),
    phone: z.string().nonempty("phone can't be empty").regex(/^01[1205][0-9]{8}$/, "Invalid phone number"),
    city: z.string().nonempty("city can't be empty"),
      
    
    });
  
  


  export type checkoutSchemaType =z.infer<typeof checkoutSchema >