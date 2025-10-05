import { getEnv } from "~/app/lib/utils";

export const uploadFiles = async (files: File[]) => {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append("file", file);
	});

	const response = await fetch(`${getEnv("VITE_WORKER_URL")}/api/upload`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Files upload failed");
	}

	return response.json();
};
