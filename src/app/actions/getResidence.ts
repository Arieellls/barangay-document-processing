"use server";

import { Users } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { drizzle } from "drizzle-orm/xata-http";

const xata = getXataClient();
const db = drizzle(xata);

export const getAllResidence = async () => {
  try {
    const residence = await db.select().from(Users);

    return residence;
  } catch (error) {
    console.log(error);
    return [];
  }
};
