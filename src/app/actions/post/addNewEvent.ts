"use server";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Events } from "@/db/schemas";
import { revalidatePath } from "next/cache";
import { drizzle } from "drizzle-orm/xata-http";
import { getXataClient } from "@/xata";

const xata = getXataClient();
const db = drizzle(xata);

const addSchema = z
  .object({
    author: z.string(),
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    startDate: z.date(),

    endDate: z.date()
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after the start date",
    path: ["endDate"]
  });

export async function addNewEvent(formData: z.infer<typeof addSchema>) {
  // Validate the data
  const result = addSchema.safeParse(formData);

  if (!result.success) {
    console.log(result.error.format());
    return result.error.format(); // Return errors if validation fails
  }

  const data = result.data;

  const id = uuidv4();
  const createdAt = new Date();

  const eventData = {
    id,
    title: data.title,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    isOngoing: true,
    createdAt: createdAt,
    updatedAt: createdAt,
    userId: "d6f1d10f-3ff4-5fc9-9d9f-140f15cd4579",
    author: data.author
  };

  await db.insert(Events).values(eventData);

  revalidatePath("/admin/events");
}
