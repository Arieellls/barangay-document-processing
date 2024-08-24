"use server";

import { Events } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { revalidatePath } from "next/cache";
import { getEvent } from "./getEvent";
import { z } from "zod";

const xata = getXataClient();
const db = drizzle(xata);

const updateSchema = z
  .object({
    id: z.string(),
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

export async function endEvent(id: string) {
  await db.update(Events).set({ isOngoing: false }).where(eq(Events.id, id));
  revalidatePath("/admin/events");
}

export async function updateEvent(
  id: string,
  formData: z.infer<typeof updateSchema>
) {
  const result = updateSchema.safeParse(formData);

  if (!result.success) {
    console.log(result.error.format());
    return result.error.format();
  }

  const data = result.data;

  await db
    .update(Events)
    .set({
      author: data.author,
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate
    })
    .where(eq(Events.id, id));
  revalidatePath("/admin/events");
}
