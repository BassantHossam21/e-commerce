"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "./../../schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: loginSchemaType) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: "/",
    });

    console.log(response);

    if (response?.ok) {
      toast.success(" ✅ You Logged In Successfully  ", {
        position: "top-center",
        duration: 3000,
      });
      // router.push("/");
      window.location.href = "/";
    } else {
      toast.error("❌" + response?.error || "Error in Signin", {
        position: "top-center",
        duration: 3000,
      });
    }

    //   try {
    //     const response = await axios.post(
    //       "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //       data
    //     );
    //     console.log("API Response:", response);
    //     if (response.data.message == "success") {
    //       toast.success("You Loged In Successfily", {
    //         position: "top-center",
    //         duration: 3000,
    //       });
    //       router.push("/");
    //     }
    //   } catch (err) {
    //     toast.error(err.response.data.message, {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //   }
    // }
  }

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-12 px-4">
        <h1 className="text-2xl md:text-3xl my-4 font-medium text-center md:text-left">
          Login Now :
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center md:justify-end mt-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                Login
              </Button>
            </div>

            {/* اللينك بتاع Forgot Password */}
            <div className="text-center mt-4">
              <Link
                href="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
