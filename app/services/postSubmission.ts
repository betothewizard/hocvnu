export const postSubmission = async (
  submission: {
    id: number;
    selectedAnswerIndex: number;
  }[],
) => {
  const response = await fetch(
    `${import.meta.env.VITE_WORKER_URL}/api/submissions`,
    {
      method: "POST",
      body: JSON.stringify(submission),
    },
  );

  return response.json();
};
