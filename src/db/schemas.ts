import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  boolean,
  integer,
  timestamp
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const Users = pgTable("users", {
  id: text("xata_id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  imageId: varchar("image_path", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  gender: varchar("gender", { length: 10 }).notNull(),
  age: integer("age").notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  purok: integer("purok").notNull(),
  completeAddress: text("complete_address").notNull(),
  contactNumber: varchar("contact_number", { length: 15 }).notNull(),
  birthday: timestamp("birthday").notNull(),
  placeOfBirth: varchar("place_of_birth", { length: 100 }).notNull(),
  emailAddress: varchar("email_address", { length: 100 }).notNull().unique(),
  isVoter: boolean("is_voter").notNull(),
  formerAddress: text("former_address").notNull(),
  role: text("role").notNull(),
  position: text("position").notNull(),
  currentAddress: text("current_address").notNull(),
  isApproved: boolean("is_approved").notNull().default(false),
  createdAt: timestamp("xata_createdat").defaultNow()
});

export const Officials = pgTable("officials", {
  id: text("xata_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
  startTerm: timestamp("start_term").notNull(),
  endTerm: timestamp("end_term").notNull(),
  termEnded: timestamp("term_ended").notNull()
});

export const Events = pgTable("events", {
  id: text("xata_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  description: text("description").notNull(),
  isOngoing: boolean("is_ongoing").notNull().default(false),
  createdAt: timestamp("xata_createdat").defaultNow(),
  updatedAt: timestamp("xata_updatedat").defaultNow(),
  author: varchar("author", { length: 50 }).notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => Users.id)
});

export const Documents = pgTable("requested_documents", {
  id: text("xata_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  pickupDate: timestamp("pickup_date").notNull(),
  claimedDate: timestamp("claimed_date"),
  serviceType: varchar("service_type", { length: 255 }).notNull(),
  purpose: text("purpose"),
  status: text("status"),
  userId: varchar("user_id")
    .notNull()
    .references(() => Users.id),
  additionalDetails: varchar("additional_details", { length: 255 }),
  createdAt: timestamp("xata_createdat").defaultNow()
});

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "Invalid image file" }
);

export const registerSchema = z
  .object({
    imageId: imageSchema.refine((file) => file.size > 0, {
      message: "Required"
    }),
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(50, { message: "Username cannot exceed 50 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long"
    }),
    firstName: z
      .string()
      .min(1, { message: "First Name is required" })
      .max(50, { message: "First Name cannot exceed 50 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last Name is required" })
      .max(50, { message: "Last Name cannot exceed 50 characters" }),
    middleName: z
      .string()
      .max(50, { message: "Middle Name cannot exceed 50 characters" })
      .optional(),
    sex: z.string().min(1, { message: "Sex is required" }).optional(),
    age: z
      .string()
      .regex(/^\d+$/, { message: "Age must be a number" })
      .min(1, { message: "Age is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    completeAddress: z
      .string()
      .min(1, { message: "Complete Address is required" }),
    contactNumber: z
      .string()
      .min(1, { message: "Contact Number is required" })
      .regex(/^\+?\d*$/, { message: "Contact Number must be a valid number" }),
    birthday: z
      .string()
      .min(1, "Birthday is required")
      .refine(
        (date) => !isNaN(Date.parse(date)) && new Date(date) <= new Date(),
        {
          message: "Birthday cannot be in the future"
        }
      ),
    placeOfBirth: z.string().min(1, { message: "Place of Birth is required" }),
    emailAddress: z.string().email({ message: "Invalid email address" }),
    isVoter: z.string().min(1, { message: "Voter status is required" }),
    formerAddress: z
      .string()
      .min(1, { message: "Former Address is required" })
      .max(200, { message: "Former Address cannot exceed 200 characters" }),
    currentAddress: z
      .string()
      .min(1, { message: "Current Address is required" }),
    purok: z
      .string()
      .min(1, { message: "Purok is required" })
      .max(50, { message: "Purok cannot exceed 50 characters" }),
    role: z.string().default("user")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
