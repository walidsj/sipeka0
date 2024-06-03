CREATE TABLE `profil_blud` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`alamat` varchar(256),
	`no_telp` varchar(256),
	`no_fax` varchar(256),
	`email` varchar(256),
	`website` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profil_blud_id` PRIMARY KEY(`id`)
);
