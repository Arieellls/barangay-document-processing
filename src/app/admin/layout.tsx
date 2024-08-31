import { auth } from "@/auth";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import getSession from "@/lib/getSession";
import { Session } from "next-auth";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (user?.role !== "admin") {
    redirect("/");
  }
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
