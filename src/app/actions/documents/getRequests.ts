"use server";

import { Documents } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { drizzle } from "drizzle-orm/xata-http";
import { eq, ne } from "drizzle-orm/expressions";

const xata = getXataClient();
const db = drizzle(xata);

export const getAllRequests = async () => {
  try {
    const requests = await db
      .select()
      .from(Documents)
      .where(ne(Documents.status, "Released"));

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};

export const getAllCompletedRequests = async () => {
  try {
    const requests = await db
      .select()
      .from(Documents)
      .where(eq(Documents.status, "Released"));

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};
