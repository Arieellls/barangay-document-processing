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
  id: serial("user_id").notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  imageId: varchar("image_path", { length: 255 }), // Optional, stores reference to image
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  gender: varchar("gender", { length: 10 }).notNull(),
  age: integer("age").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // e.g., single, married, etc.
  completeAddress: text("complete_address").notNull(),
  contactNumber: varchar("contact_number", { length: 15 }).notNull(),
  birthday: date("birthday").notNull(),
  placeOfBirth: varchar("place_of_birth", { length: 100 }).notNull(),
  emailAddress: varchar("email_address", { length: 100 }).notNull().unique(),
  isVoter: boolean("is_voter").notNull().default(false),
  formerAddress: text("former_address"),
  currentAddress: text("current_address").notNull()
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
  userId: varchar("user_id")
    .notNull()
    .references(() => Users.id)
});
