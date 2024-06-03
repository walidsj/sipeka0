CREATE TABLE `rku` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`no_dokumen` varchar(256),
	`uraian` varchar(256),
	`unit_kerja_id` int unsigned,
	`tgl_dokumen` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rku_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `rba` ADD `no_dokumen` varchar(256);--> statement-breakpoint
ALTER TABLE `rba` DROP COLUMN `tgl_penyusunan`;