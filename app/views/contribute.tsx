import { useState } from "react";
import { Button } from "~/app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { styles } from "~/app/styles";

export default function ContributePage() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
			setMessage("");
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!file) {
			setMessage("Please select a file to upload.");
			return;
		}

		setUploading(true);
		setMessage("Uploading...");

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (response.ok) {
				setMessage(data.message || "File uploaded successfully!");
				setFile(null);
				const fileInput = document.getElementById(
					"file-upload",
				) as HTMLInputElement;
				if (fileInput) {
					fileInput.value = "";
				}
			} else {
				setMessage(data.error || "An error occurred during upload.");
			}
		} catch (error) {
			setMessage("An error occurred during upload.");
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
							Upload a file to share with the community.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="file-upload">File</Label>
								<Input
									id="file-upload"
									type="file"
									onChange={handleFileChange}
								/>
							</div>
							<Button type="submit" disabled={uploading || !file}>
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
