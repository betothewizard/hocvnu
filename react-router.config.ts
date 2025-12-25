import type { Config } from "@react-router/dev/config";
import { getQuizzesMetadata } from "./app/services/quizzes";

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const urls = ["/", "/tai-lieu", "/trac-nghiem"];

    try {
      const quizzes = await getQuizzesMetadata();

      // Ensure quizzes is an array before iterating
      if (Array.isArray(quizzes)) {
        for (const quiz of quizzes) {
          const totalPages = Math.ceil(quiz.total / 10);

          for (let p = 0; p < totalPages; p++) {
            urls.push(`/trac-nghiem/${quiz.code}/${p}`);
          }

          urls.push(`/trac-nghiem/${quiz.code}`);
        }
      } else {
        console.warn(
          "[prerender] getQuizzesMetadata did not return an array:",
          quizzes
        );
      }
    } catch (error) {
      console.error("[prerender] Failed to fetch quizzes metadata:", error);
    }

    return urls;
  },
} satisfies Config;
