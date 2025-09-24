"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotpasswordSchema,
  ForgotPasswordSchemaType,
} from "../../../schema/forgotpassword.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const form = useForm<ForgotPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotpasswordSchema),
  });

  async function handleForgotPassword(data: ForgotPasswordSchemaType) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        data
      );

      console.log(response);
      if (response.data.statusMsg === "success") {
        toast.success("✅ Reset link sent to your email", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/verify-reset-code");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Error", {
          position: "top-center",
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-12 px-4">
      <h1 className="text-2xl md:text-3xl my-4 font-medium text-center md:text-left">
        Forgot Password :
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleForgotPassword)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center md:justify-end mt-6">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
