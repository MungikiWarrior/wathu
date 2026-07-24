CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`serviceType` varchar(64) NOT NULL,
	`customServiceType` varchar(255),
	`fileUrls` text NOT NULL,
	`fileNames` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
