CREATE TABLE `bank` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`kode` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bank_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pegawai` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`gelar_depan` varchar(256),
	`gelar_belakang` varchar(256),
	`nip` varchar(18),
	`nik` varchar(16),
	`jabatan` varchar(256),
	`npwp` varchar(15),
	`no_telp` varchar(256),
	`status_pegawai` enum('PNS','PPPK','NON ASN','MOU'),
	`bank_id` int unsigned,
	`nama_rekening` varchar(256),
	`no_rekening` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pegawai_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pengelola_blud` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`pegawai_id` int unsigned,
	`role` enum('KUASA PENGGUNA ANGGARAN','PEJABAT PELAKSANA TEKNIS KEGIATAN','PEJABAT PEMBUAT KOMITMEN','BENDAHARA PENGELUARAN','BENDAHARA PENERIMAAN','PEJABAT PENATAUSAHAAN KEUANGAN','PENGURUS BARANG','PEJABAT PENGADAAN'),
	`no_sk` varchar(256),
	`tgl_sk` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pengelola_blud_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rekanan` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`jenis` enum('PERORANGAN','SWASTA','BUMN/BUMD','PEMERINTAH'),
	`alamat` varchar(256),
	`npwp` varchar(15),
	`no_telp` varchar(256),
	`nama_pimpinan` varchar(256),
	`pic` varchar(256),
	`no_pic` varchar(256),
	`status_rekanan` enum('BIASA','MOU'),
	`bank_id` int unsigned,
	`nama_rekening` varchar(256),
	`no_rekening` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rekanan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`password` varchar(256),
	`role` enum('ADMIN','USER'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
