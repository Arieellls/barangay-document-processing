"use server";

import { Events } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { revalidatePath } from "next/cache";
import { getEvent } from "./getEvent";

const xata = getXataClient();
const db = drizzle(xata);

export async function deleteEvent(id: string) {
  await db.delete(Events).where(eq(Events.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/events");
}
