import type { Config } from "@react-router/dev/config";
import { getQuizzesMetadata } from "./app/services/quizzes";

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const quizzes = await getQuizzesMetadata();
    return [
      "/",
      "/tai-lieu",
      "/trac-nghiem",
      ...quizzes.map((quiz) => `/trac-nghiem/${quiz.code}`),
    ];
  },
} satisfies Config;
