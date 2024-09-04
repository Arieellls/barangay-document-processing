"use server";

import { Users } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export const getAccount = async (id?: string) => {
  if (!id) return;
  const [user] = await db.select().from(Users).where(eq(Users.id, id));
  return user || {};
};
