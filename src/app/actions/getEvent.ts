"use server";

import { Events } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export const getEvent = async (eventId: string) => {
  const [event] = await db.select().from(Events).where(eq(Events.id, eventId));
  return event || {};
};
