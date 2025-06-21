CREATE TABLE `questions` (
	`code` text NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`code`) REFERENCES `subjects`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`code` text NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`code`) REFERENCES `subjects`(`code`) ON UPDATE no action ON DELETE no action
);
