CREATE TABLE `aktivitas_rka` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`sub_kegiatan_rka_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aktivitas_rka_id` PRIMARY KEY(`id`)
);
