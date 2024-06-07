CREATE TABLE `rab` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode_rekening` varchar(256),
	`uraian` varchar(256),
	`spesifikasi` varchar(256),
	`volume` decimal,
	`satuan` varchar(256),
	`harga` decimal,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rab_id` PRIMARY KEY(`id`)
);
