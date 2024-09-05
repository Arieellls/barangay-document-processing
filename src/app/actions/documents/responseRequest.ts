"use server";

import { Documents } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { drizzle } from "drizzle-orm/xata-http";
import { and, asc, desc, eq, ne, or } from "drizzle-orm/expressions";
import { revalidatePath } from "next/cache";
import { sendIndigency } from "@/app/admin/emails/sendIndigencyt";
import { formatFullname } from "@/lib/formatFullname";
import { formatDate } from "@/lib/formatDate";
import { sendClearance } from "@/app/admin/emails/sendClearance";
import { sendResidency } from "@/app/admin/emails/sendResidency";

const xata = getXataClient();
const db = drizzle(xata);

export const updateUserRequestStatusToReleased = async (request: any) => {
  console.log(request);
  try {
    await db
      .update(Documents)
      .set({
        status: "Released",
        claimedDate: new Date()
      })
      .where(
        and(eq(Documents.id, request.id), ne(Documents.status, "Released"))
      );

    const fullName = formatFullname({
      firstName: request.firstName,
      middleName: request?.middleName,
      lastName: request.lastName
    });

    const datePlus7Days = new Date();
    datePlus7Days.setDate(datePlus7Days.getDate() + 7);

    console.log(
      `Status updated to "Released" and claimedDate set for request ID ${request.id}.`
    );

    if (request.status === "Ready") return;

    if (request.serviceType === "Barangay Indigency") {
      sendIndigency(
        fullName,
        request?.purpose || request.additionalDetails,
        formatDate(new Date()),
        formatDate(datePlus7Days)
      );
    }

    if (request.serviceType === "Barangay Clearance") {
      sendClearance(
        fullName,
        request?.purpose || request.additionalDetails,
        formatDate(new Date())
      );
    }

    if (request.serviceType === "Barangay Residency") {
      sendResidency(
        fullName,
        request?.purpose || request.additionalDetails,
        formatDate(new Date())
      );
    }
  } catch (error) {
    return error;
  }

  revalidatePath("/admin/requested-documents");
  revalidatePath("/admin/history");
};

export const updateUserRequestStatusToDeclined = async (id: string) => {
  try {
    await db
      .update(Documents)
      .set({ status: "Declined" })
      .where(and(eq(Documents.id, id), ne(Documents.status, "Declined")));

    console.log(`Status updated to "Declined" for request ${id} ID.`);
  } catch (error) {
    return error;
  }
  revalidatePath("/admin/requested-documents");
  revalidatePath("/admin/history");
};

export const updateUserRequestStatusToReady = async (id: string) => {
  try {
    await db
      .update(Documents)
      .set({ status: "Ready" })
      .where(and(eq(Documents.id, id), ne(Documents.status, "Ready")));

    console.log(`Status updated to "Ready" for request ${id} ID.`);
  } catch (error) {
    return error;
  }
  revalidatePath("/admin/requested-documents");
  revalidatePath("/admin/history");
};

export const updateUserRequestStatusToPending = async (id: string) => {
  try {
    await db
      .update(Documents)
      .set({ status: "Pending" })
      .where(and(eq(Documents.id, id), ne(Documents.status, "Pending")));

    console.log(`Status updated to "Pending" for request ${id} ID.`);
  } catch (error) {
    return error;
  }
  revalidatePath("/admin/requested-documents");
  revalidatePath("/admin/history");
};