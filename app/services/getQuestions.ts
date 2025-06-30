import type { IQuizMetadata } from "~/types/quizzes";

export const getQuestions = async (subjectCode: string, page: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_WORKER_URL}/api/subject/${subjectCode}/questions?page=${page}`,
    {
      method: "GET",
    },
  );
  const data = await response.json();

  return data;
};

export const getQuizzesMetadata = async (): Promise<IQuizMetadata[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_WORKER_URL}/api/quizzes/metadata`,
    {
      method: "GET",
    },
  );
  const data = await response.json();

  return data;
};
