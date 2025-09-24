// schema/verifyCode.schema.ts
import * as z from "zod";

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Reset code is required")
    .length(6, "Reset code must be 6 digits"),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
