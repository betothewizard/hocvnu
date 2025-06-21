import type { D1Database } from "@cloudflare/workers-types";
import { desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createDb } from "./db";
import { questionsTable, subjectsTable, submissionsTable } from "./db/schema";
import { PAGE_SIZE } from "./constants";

interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGIN = "*";

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.use(
  "*",
  cors({
    origin: ALLOWED_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("hi", (c) => {
  return c.text("Hello");
});

app.get("/subject/:subjectCode/questions", async (c) => {
  try {
    const db = createDb(c.env.DB);

    const subjectCode = c.req.param("subjectCode");
    const subject = await db.query.subjectsTable.findFirst({
      where: eq(subjectsTable.code, subjectCode),
    });
    if (!subject) {
      return c.json({ error: "Subject not found" });
    }

    const { data: allQuestions } = await db.query.questionsTable.findFirst({
      where: eq(questionsTable.subjectCode, subjectCode),
      columns: { data: true },
    });
    if (!allQuestions) {
      return c.json({ error: "Questions not found" });
    }

    const parsedQuestions = JSON.parse(allQuestions);

    const page = +(c.req.query("page") || "0");
    const totalPages = Math.ceil(parsedQuestions.length / PAGE_SIZE);
    if (page < 0 || page >= totalPages) {
      return c.json({ error: "Invalid page" });
    }

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const questions = parsedQuestions.slice(start, end);

    return c.json({ questions, meta: { page, totalPages } });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
});

app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

export default app;
