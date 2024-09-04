"use server";

import { Users } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { revalidatePath } from "next/cache";

const xata = getXataClient();
const db = drizzle(xata);

export const getAccountForApproval = async () => {
  return await db
    .select()
    .from(Users)
    .where(eq(Users.isApproved, false))
    .orderBy(desc(Users.createdAt));
};

export const acceptAccount = async (id: string) => {
  await db.update(Users).set({ isApproved: true }).where(eq(Users.id, id));

  revalidatePath("admin/account-approval");
};

export const deleteAccount = async (id: string) => {
  await db.delete(Users).where(eq(Users.id, id));

  revalidatePath("admin/account-approval");
};
