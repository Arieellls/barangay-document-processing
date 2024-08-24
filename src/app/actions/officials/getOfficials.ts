"use server";

import { Officials } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, isNull, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export const getAllOfficials = async () => {
  try {
    const officials = await db
      .select()
      .from(Officials)
      .where(isNull(Officials.termEnded))
      .orderBy(desc(Officials.firstName));

    return officials;
  } catch (error) {
    console.log(error);
    return [];
  }
};
