"use client";

import { UploadCloud, File as FileIcon, X } from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Button } from "~/app/components/ui/button";

const variants = {
	base: "relative rounded-lg p-4 w-full flex justify-center items-center flex-col cursor-pointer border border-dashed border-border transition-colors duration-200 ease-in-out",
	active: "border-2 border-primary",
	disabled:
		"bg-muted border-border cursor-default pointer-events-none bg-opacity-30",
	accept: "border border-primary bg-primary/10",
	reject: "border border-destructive bg-destructive/10",
};

type InputProps = {
	width?: number;
	height?: number;
	className?: string;
	value?: File[];
	onChange?: (files: File[]) => void | Promise<void>;
	disabled?: boolean;
	dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
	fileTooLarge(maxSize: number) {
		return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
	},
	fileInvalidType() {
		return "Invalid file type.";
	},
	tooManyFiles(maxFiles: number) {
		return `You can only add ${maxFiles} file(s).`;
	},
	fileNotSupported() {
		return "The file is not supported.";
	},
};

const Uploader = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ dropzoneOptions, width, height, value, className, disabled, onChange },
		ref,
	) => {
		const onDrop = (acceptedFiles: File[]) => {
			if (!acceptedFiles) return;
			const newFiles = value ? [...value, ...acceptedFiles] : acceptedFiles;
			onChange?.(newFiles);
		};

		const {
			getRootProps,
			getInputProps,
			isDragActive,
			isDragAccept,
			isDragReject,
			fileRejections,
		} = useDropzone({
			onDrop,
			disabled,
			...dropzoneOptions,
		});

		const dropZoneClassName = React.useMemo(
			() =>
				twMerge(
					variants.base,
					isDragActive && variants.active,
					disabled && variants.disabled,
					isDragAccept && variants.accept,
					isDragReject && variants.reject,
					className,
				).trim(),
			[isDragActive, isDragAccept, isDragReject, disabled, className],
		);

		const errorMessage = React.useMemo(() => {
			if (fileRejections[0]) {
				const { errors } = fileRejections[0];
				if (errors[0]?.code === "file-too-large") {
					return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
				} else if (errors[0]?.code === "file-invalid-type") {
					return ERROR_MESSAGES.fileInvalidType();
				} else if (errors[0]?.code === "too-many-files") {
					return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
				} else {
					return ERROR_MESSAGES.fileNotSupported();
				}
			}
			return undefined;
		}, [fileRejections, dropzoneOptions]);

		const removeFile = (file: File) => {
			const newFiles = value?.filter((f) => f !== file);
			onChange?.(newFiles || []);
		};

		return (
			<div>
				<div
					{...getRootProps({
						className: dropZoneClassName,
						style: {
							width,
							height,
						},
					})}
				>
					<input ref={ref} {...getInputProps()} />
					<div className="flex flex-col items-center justify-center text-xs text-muted-foreground">
						<UploadCloud className="mb-2 h-7 w-7" />
						<div className="text-muted-foreground">drag & drop to upload</div>
						<div className="mt-3">
							<Button variant="outline" disabled={disabled}>
								Select
							</Button>
						</div>
					</div>
				</div>

				{errorMessage && (
					<div className="mt-1 text-xs text-destructive">{errorMessage}</div>
				)}

				{value && value.length > 0 && (
					<div className="mt-4 space-y-2">
						{value.map((file, i) => (
							<div
								key={i}
								className="flex items-center justify-between p-2 border rounded-md"
							>
								<div className="flex items-center gap-2">
									<FileIcon size={20} />
									<span className="text-sm">{file.name}</span>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeFile(file)}
								>
									<X size={16} />
								</Button>
							</div>
						))}
					</div>
				)}
			</div>
		);
	},
);

Uploader.displayName = "Uploader";

function formatFileSize(bytes?: number) {
	if (!bytes) {
		return "0 Bytes";
	}
	const k = 1024;
	const dm = 2;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { Uploader };
