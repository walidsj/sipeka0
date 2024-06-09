CREATE TABLE `rap` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode_rekening` varchar(256),
	`uraian` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rap_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `rap_id` int unsigned;--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `jumlah` decimal(20,2);