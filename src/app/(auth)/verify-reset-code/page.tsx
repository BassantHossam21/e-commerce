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
  verifyCodeSchema,
  VerifyCodeSchemaType,
} from "@/schema/verifyCode.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyResetCode() {
  const router = useRouter();

  const form = useForm<VerifyCodeSchemaType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifyCodeSchema),
  });

  async function handleVerifyCode(data: VerifyCodeSchemaType) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data
      );

      console.log(response.data);

      if (response.data.status === "Success") {
        toast.success("✅ Code verified, now reset your password", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/reset-password"); // بعد التأكد يروح صفحة تغيير الباسورد
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Error verifying code", {
          position: "top-center",
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-12 px-4">
      <h1 className="text-2xl md:text-3xl my-4 font-medium text-center md:text-left">
        Verify Reset Code
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerifyCode)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center md:justify-end mt-6">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              Verify Code
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
