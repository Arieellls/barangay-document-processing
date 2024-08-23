"use server";

import { Events } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export const getAllEvents = async () => {
  try {
    const events = await db
      .select()
      .from(Events)
      .orderBy(desc(Events.createdAt));

    return events;
  } catch (error) {
    return [];
  }
};

export const getCompletedEvents = async () => {
  try {
    const events = await db
      .select()
      .from(Events)
      .where(sql`${Events.isOngoing} = FALSE`)
      .orderBy(desc(Events.createdAt))
      .execute();

    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export const getOnGoingEvents = async () => {
  try {
    const events = await db
      .select()
      .from(Events)
      .where(sql`${Events.isOngoing} = TRUE`)
      .orderBy(desc(Events.createdAt))
      .execute();

    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};
