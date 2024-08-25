"use server";

import { Officials } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { revalidatePath } from "next/cache";

const xata = getXataClient();
const db = drizzle(xata);

export const endTerm = async (id: string) => {
  try {
    await db
      .update(Officials)
      .set({ termEnded: new Date() })
      .where(eq(Officials.id, id));

    revalidatePath("/admin/barangay-officials");
  } catch (error) {
    console.log(error);
    return [];
  }
};
