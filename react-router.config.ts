import type { Config } from "@react-router/dev/config";
import { getQuizzesMetadata } from "./app/services/quizzes";

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const urls = ["/", "/tai-lieu", "/trac-nghiem"];

    const quizzes = await getQuizzesMetadata();
    for (const quiz of quizzes) {
      const totalPages = Math.ceil(quiz.total / 10);

      for (let p = 0; p < totalPages; p++) {
        urls.push(`/trac-nghiem/${quiz.code}/${p}`);
      }

      urls.push(`/trac-nghiem/${quiz.code}`);
    }

    return urls;
  },
} satisfies Config;
