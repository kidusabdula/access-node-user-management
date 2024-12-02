"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast"; // Import toast
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchUsers() {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      }
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      toast.success("You have been logged out.");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-200 border-t-gray-800 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

      <main className="flex flex-col items-center gap-8 mt-14">
        <h1 className="text-2xl font-bold text-center">
          Welcome to the User Management System
        </h1>

        {isAuthenticated ? (
          <div className="flex gap-4 flex-col sm:flex-row items-center justify-center w-full">
            <Button
              onClick={handleLogout}
              className="rounded-full text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 flex-col sm:flex-row items-center justify-center w-full">
            <Button
              onClick={() => router.push("/register")}
              className="rounded-full text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Sign Up
            </Button>

            <Button
              onClick={() => router.push("/login")}
              className="rounded-full text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Sign In
            </Button>
          </div>
        )}

        {isAuthenticated && users.length > 0 && (
          <Table className="w-full mt-8">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Hashed Password</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">{user.id}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <Link href={"/documentation"} className=" hover:underline hover:underline-offset-4">
          <span>Read Documentation</span>
        </Link>
      </footer>
    </div>
  );
}
