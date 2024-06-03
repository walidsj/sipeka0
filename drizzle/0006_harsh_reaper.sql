CREATE TABLE `rba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`uraian` varchar(256),
	`tgl_penyusunan` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rba_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unit_kerja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `unit_kerja_id` PRIMARY KEY(`id`)
);
