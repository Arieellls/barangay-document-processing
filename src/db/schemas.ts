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
  isVoter: boolean("is_voter").notNull().default(false),
  formerAddress: text("former_address").notNull(),
  role: text("role").notNull(),
  position: text("position").notNull(),
  currentAddress: text("current_address").notNull()
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

const Documents = pgTable("requested_documents", {
  id: text("xata_id").primaryKey(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  middle_name: text("middle_name"),
  pickup_date: text("pickuo_date"),
  purpose: text("purpose"),
  userId: varchar("user_id")
    .notNull()
    .references(() => Users.id)
});
