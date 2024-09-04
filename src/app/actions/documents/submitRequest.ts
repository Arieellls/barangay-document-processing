"use server";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Documents, Events } from "@/db/schemas";
import { revalidatePath } from "next/cache";
import { drizzle } from "drizzle-orm/xata-http";
import { getXataClient } from "@/xata";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const xata = getXataClient();
const db = drizzle(xata);

const requestSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  serviceType: z.string().min(1, "Service type is required."),
  purpose: z.string().min(1, "Purpose is required."),
  pickupDate: z
    .date({
      required_error: "Pick-up date is required.",
      invalid_type_error: "Invalid date."
    })
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Pick-up date cannot be in the past."),
  additionalDetails: z.string().optional()
});

export async function submitRequestDocuments(
  formData: z.infer<typeof requestSchema>
) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }
  const result = requestSchema.safeParse(formData);

  if (!result.success) {
    console.log(result.error.format());
    return result.error.format();
  }

  const data = result.data;
  console.log("RAW Data: ", data);

  const id = uuidv4();

  const requestData = {
    id,
    firstName: data.firstName,
    middleName: data.middleName || "",
    lastName: data.lastName,
    userId: user.id || "",
    purpose: data.purpose,
    pickupDate: data.pickupDate,
    serviceType: data.serviceType,
    status: "Pending",
    additionalDetails: data.additionalDetails || "",
    claimedDate: null,
    createdAt: new Date()
  };

  console.log("Request Data: ", requestData);

  await db.insert(Documents).values(requestData);

  revalidatePath("/request-documents");
}
