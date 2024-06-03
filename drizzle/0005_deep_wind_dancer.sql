CREATE TABLE `kegiatan_rka` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`program_rka_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `kegiatan_rka_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `program_rka` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `program_rka_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sub_kegiatan_rka` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`kegiatan_rka_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sub_kegiatan_rka_id` PRIMARY KEY(`id`)
);
