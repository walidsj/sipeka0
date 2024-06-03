CREATE TABLE `aktivitas_rba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`sub_kegiatan_rka_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aktivitas_rba_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `aktivitas_rka`;