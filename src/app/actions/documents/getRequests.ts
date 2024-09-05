"use server";

import { Documents } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { drizzle } from "drizzle-orm/xata-http";
import { and, asc, desc, eq, ne, or } from "drizzle-orm/expressions";

const xata = getXataClient();
const db = drizzle(xata);

export const getAllRequests = async () => {
  try {
    const requests = await db
      .select()
      .from(Documents)
      .where(
        and(ne(Documents.status, "Released"), ne(Documents.status, "Declined"))
      )
      .orderBy(desc(Documents.createdAt));

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
      .where(
        or(eq(Documents.status, "Released"), eq(Documents.status, "Declined"))
      );

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};

export const getUserRequest = async (id: string) => {
  try {
    const requests = await db
      .select()
      .from(Documents)
      .where(and(eq(Documents.userId, id), ne(Documents.status, "Released")))
      .orderBy(desc(Documents.createdAt));

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};

export const getUserRequestHistory = async (id: string) => {
  try {
    const requests = await db
      .select()
      .from(Documents)
      .where(and(eq(Documents.userId, id), eq(Documents.status, "Released")))
      .orderBy(desc(Documents.createdAt));

    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};
