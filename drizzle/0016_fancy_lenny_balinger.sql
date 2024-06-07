ALTER TABLE `rincian_rba` ADD `rab_id` int unsigned;--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `volume` decimal;--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `satuan` varchar(256);--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `harga` decimal;--> statement-breakpoint
ALTER TABLE `rincian_rba` ADD `keterangan` varchar(256);--> statement-breakpoint
ALTER TABLE `rab` DROP COLUMN `volume`;--> statement-breakpoint
ALTER TABLE `rab` DROP COLUMN `satuan`;--> statement-breakpoint
ALTER TABLE `rab` DROP COLUMN `harga`;--> statement-breakpoint
ALTER TABLE `rincian_rba` DROP COLUMN `uraian`;