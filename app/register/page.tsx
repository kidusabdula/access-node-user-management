"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      toast.success("Signup successful! Please log in.");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20">
      <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 border-b text-white py-4 w-full text-center flex flex-row items-center justify-between">
        <Link href={"/"} className="ml-20">
          {" "}
          <h1 className="text-2xl font-extralight">AccessNode</h1>{" "}
        </Link>
        <Link href={"/documentation"} className="mr-20">
          <span className="font-extrabold hover:underline hover:underline-offset-4">
            Documentation
          </span>
        </Link>
      </nav>
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Sign Up</h1>
        <h3 className="mb-5 text-sm font-light">Create an Account</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border rounded-2xl p-10 h-[70vh] w-[40vw] flex flex-col justify-center items-center"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      className="w-[25vw]"
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="w-[25vw] my-10"
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-[10vw]">
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <div className="flex flex-row">
              <h3 className="text-xs mr-3">Already Have an Account? </h3>
              <Link href="/login" className="text-xs underline">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
