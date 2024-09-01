"use server";

import { registerSchema, Users } from "@/db/schemas";
import { getXataClient } from "@/xata";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/xata-http";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const xata = getXataClient();
const db = drizzle(xata);

export const login = async (formData: FormData): Promise<string | null> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password
    });

    if (result?.error) {
      return result.error;
    }

    return null;
  } catch (error) {
    return "An unexpected error occurred. Please try again.";
  }
};

export const registerAccount = async (
  formData: z.infer<typeof registerSchema>
) => {
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    console.error("Validation failed:", result.error.format());
    return result.error.format();
  }

  try {
    const [existingUserByEmail] = await db
      .select()
      .from(Users)
      .where(eq(Users.emailAddress, formData.emailAddress));

    const [existingUserByUsername] = await db
      .select()
      .from(Users)
      .where(eq(Users.username, formData.username));

    if (existingUserByEmail || existingUserByUsername) {
      console.error("User already exists");
      return { error: "User already exists" };
    }
  } catch (error) {
    console.error("Error checking for existing user:", error);
    return { error: "An error occurred while checking for existing user" };
  }

  const data = result.data;

  const hashedPassword = await hash(data.password, 12);

  const id = uuidv4();

  const userData = {
    id,
    username: data.username,
    password: hashedPassword,
    imageId: "placeholder",
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data?.middleName,
    gender: data.sex,
    age: +data.age,
    status: data.status,
    completeAddress: data.completeAddress,
    placeOfBirth: data.placeOfBirth,
    emailAddress: data.emailAddress,
    formerAddress: data.formerAddress,
    currentAddress: data.currentAddress,
    role: data.role,
    birthday: new Date(data.birthday), // Assuming birthday is a date
    isVoter: data.isVoter === "true", // Convert isVoter to a boolean
    contactNumber: data.contactNumber,
    position: "",
    purok: +data.purok
  };

  try {
    await db.insert(Users).values(userData);
  } catch (error) {
    console.error("Error inserting new user:", error);
    return { error: "An error occurred while inserting the new user" };
  }
};

export const checkUser = async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.emailAddress, email))
      .execute();

    return user || null;
  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
};
