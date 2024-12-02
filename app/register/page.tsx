'use client';

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

// Define schema for validation
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

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      alert("Signup successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Sign Up</h1>
        <h3 className="mb-5 text-sm font-light">Create an Account</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border rounded-2xl p-10 h-[70vh] w-[40vw] flex flex-col justify-center items-center"
          >
            {/* Email Field */}
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
                  {form.formState.errors.email && <FormMessage>{form.formState.errors.email?.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Password Field */}
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
                  {form.formState.errors.password && <FormMessage>{form.formState.errors.password?.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Submit Button */}
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
