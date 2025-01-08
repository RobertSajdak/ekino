import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user-schema";

export const sessionsTable = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
