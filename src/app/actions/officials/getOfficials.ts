"use server";

import { Officials, Users } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, isNull, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

// Fetch all officials whose terms haven't ended, ordered by first name descending
export const getAllOfficials = async () => {
  try {
    const officials = await db
      .select({
        officials: Officials,
        users: Users
      })
      .from(Officials)
      .leftJoin(Users, eq(Officials.userId, Users.id))
      .where(isNull(Officials.termEnded))
      .orderBy(desc(Users.firstName));

    return officials;
  } catch (error) {
    console.error("Error fetching officials:", error);
    return [];
  }
};
