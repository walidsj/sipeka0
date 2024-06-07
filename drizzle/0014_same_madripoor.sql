CREATE TABLE `rincian_rba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`aktivitas_rba_id` int unsigned,
	`kode_rekening` varchar(256),
	`uraian` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rincian_rba_id` PRIMARY KEY(`id`)
);
