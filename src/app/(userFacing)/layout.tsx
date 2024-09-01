import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import getSession from "@/lib/getSession";
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

  if (user?.role !== "user") {
    redirect("/");
  }
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
