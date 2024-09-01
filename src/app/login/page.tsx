"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { useRouter, redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "@/actions/users";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;
  if (status !== "loading") {
    console.log(user);
  }

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const errorResponse = await login(formData);

      if (errorResponse) {
        setError(errorResponse);
      } else {
        router.push("/"); // Use router.push here as well
      }
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full w-96"
      >
        <div className="my-4">
          <h1>Barangay Management System</h1>
        </div>
        <div className="w-full pt-2 space-y-2">
          <Label htmlFor="email" className="pt-4">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            disabled={isPending}
          />
        </div>
        <div className="w-full pt-2 space-y-2">
          <Label htmlFor="password" className="pt-4">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            disabled={isPending}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
        <Button asChild disabled={isPending} className="w-full bg-gray-300">
          <Link href={"/register"} className="mt-5">
            Create Account
          </Link>
        </Button>
      </form>
    </div>
  );
}
