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
