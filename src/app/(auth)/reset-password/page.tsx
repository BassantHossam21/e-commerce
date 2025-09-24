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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/resetPassword.schema";

export default function ResetPassword() {
  const router = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: { email: "", newPassword: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleResetPassword(data: ResetPasswordSchemaType) {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: data.email,
          newPassword: data.newPassword,
        }
      );
      console.log(response);
      toast.success("✅ Password reset successfully", {
        position: "top-center",
        duration: 3000,
      });
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Error resetting password", {
          position: "top-center",
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-12 px-4">
      <h1 className="text-2xl md:text-3xl my-4 font-medium text-center md:text-left">
        Reset Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
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

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center md:justify-end mt-6">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
