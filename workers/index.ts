import type { D1Database, R2Bucket } from "@cloudflare/workers-types";
import { count, desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createDb } from "~/db";
import { questionsTable, subjectsTable, submissionsTable } from "~/db/schema";
import { PAGE_SIZE } from "./constants";

interface Env {
	DB: D1Database;
	HOCVNU_R2: R2Bucket;
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

app.get("/hi", (c) => {
	return c.text("Hello");
});

app
	.get("/quizzes/metadata", async (c) => {
		try {
			const db = createDb(c.env.DB);

			const raw = await db
				.select({
					code: questionsTable.subjectCode,
					name: subjectsTable.name,
					data: questionsTable.data,
				})
				.from(questionsTable)
				.innerJoin(
					subjectsTable,
					eq(subjectsTable.code, questionsTable.subjectCode),
				);

			if (!raw) {
				return c.json({ error: "Subjects not found" });
			}

			const metadata = raw.map((row) => {
				const parsedQuestions = JSON.parse(row.data);
				return {
					code: row.code,
					name: row.name,
					total: parsedQuestions.length,
				};
			});

			return c.json(metadata);
		} catch (e) {
			console.error(e);
			return c.json({ error: e }, 500);
		}
	})
	.get("/subject/:subjectCode/quizzes", async (c) => {
		try {
			const db = createDb(c.env.DB);

			const subjectCode = c.req.param("subjectCode");
			const subject = await db.query.subjectsTable.findFirst({
				where: eq(subjectsTable.code, subjectCode),
			});
			if (!subject) {
				return c.json({ error: "Subject not found" });
			}

			const result = await db.query.questionsTable.findFirst({
				where: eq(questionsTable.subjectCode, subjectCode),
				columns: { data: true },
			});
			const allQuestions = result?.data;
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
	})
	.post("/subject/:subjectCode/submit", async (c) => {
		try {
			const db = createDb(c.env.DB);
			const subjectCode = c.req.param("subjectCode");
			const body = await c.req.json();

			const subject = await db.query.subjectsTable.findFirst({
				where: eq(subjectsTable.code, subjectCode),
			});
			if (!subject) {
				return c.json({ error: "Subject not found" });
			}

			const result = await db.query.submissionsTable.findFirst({
				columns: {
					data: true,
				},
				where: eq(submissionsTable.subjectCode, subjectCode),
			});
			const submissions = result?.data;
			if (!submissions) {
				return c.json({ error: "Submissions not found" });
			}
			const parsedSubmissions = JSON.parse(submissions);

			body.forEach((element) => {
				parsedSubmissions[element.id][element.selectedAnswerIndex]++;
			});
		} catch (e) {
			console.error(e);
			return c.json({ error: e }, 500);
		}
	});

app.post("/upload", async (c) => {
	const formData = await c.req.formData();
	const files = formData.getAll("file") as unknown as File[];

	if (!files || files.length === 0) {
		return c.json({ error: "No file uploaded" }, 400);
	}

	try {
		for (const file of files) {
			const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
			await c.env.HOCVNU_R2.put(sanitizedFilename, await file.arrayBuffer(), {
				httpMetadata: {
					contentType: file.type,
				},
			});
		}
		return c.json({ message: "Files uploaded successfully" });
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to upload files" }, 500);
	}
});

app.notFound((c) => {
	return c.json({ error: "Not found" }, 404);
});

export default app;
