import { useState } from "react";
import { Button } from "~/app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/app/components/ui/card";
import { Uploader } from "~/app/components/ui/uploader";
import { uploadFiles } from "~/app/services/upload";
import { styles } from "~/app/styles";

export default function ContributePage() {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState("");

	const handleFileChange = (files: File[]) => {
		setFiles(files);
		setMessage("");
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!files || files.length === 0) {
			setMessage("Please select files to upload.");
			return;
		}

		setUploading(true);
		setMessage("Uploading...");

		try {
			const data = await uploadFiles(files);
			setMessage(data.message || "Files uploaded successfully!");
			setFiles([]);
		} catch (error) {
			if (error instanceof Error) {
				setMessage(error.message);
			} else {
				setMessage("An error occurred during upload.");
			}
			console.error("Upload error:", error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className={`${styles.paddingX} ${styles.flexCenter}`}>
			<div className={`${styles.boxWidth}`}>
				<Card>
					<CardHeader>
						<CardTitle>Contribute a Document</CardTitle>
						<CardDescription>
							Upload files to share with the community.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<Uploader
								value={files}
								onChange={handleFileChange}
								disabled={uploading}
								dropzoneOptions={{
									maxSize: 1024 * 1024 * 5, // 5MB
								}}
							/>
							<Button
								type="submit"
								disabled={uploading || !files || files.length === 0}
							>
								{uploading ? "Uploading..." : "Upload"}
							</Button>
						</form>
						{message && <p className="mt-4 text-sm">{message}</p>}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
