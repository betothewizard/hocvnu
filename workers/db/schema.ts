import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const subjectsTable = sqliteTable("subjects", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
});

export const questionsTable = sqliteTable("questions", {
  subjectCode: text("code")
    .notNull()
    .references(() => subjectsTable.code),
  data: text("data").notNull(),
});

export const submissionsTable = sqliteTable("submissions", {
  subjectCode: text("code")
    .notNull()
    .references(() => subjectsTable.code),
  data: text("data").notNull(),
});
