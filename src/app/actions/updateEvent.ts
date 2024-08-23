"use server";

import { Events } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { revalidatePath } from "next/cache";
import { getEvent } from "./getEvent";

const xata = getXataClient();
const db = drizzle(xata);

export async function endEvent(id: string) {
  await db.update(Events).set({ isOngoing: false }).where(eq(Events.id, id));
  revalidatePath("/admin/events");
}
