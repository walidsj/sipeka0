CREATE TABLE `aktivitas_rba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode` varchar(256),
	`nama` varchar(256),
	`rba_id` int unsigned,
	`jenis` enum('BELANJA','PENDAPATAN','PEMBIAYAAN'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aktivitas_rba_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bank` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`kode` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bank_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `belanja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`rab_id` int unsigned,
	`tgl_dokumen` date,
	`no_dokumen` varchar(256),
	`uraian` text,
	`jumlah` decimal(20,2),
	`rekanan_id` int unsigned,
	`pegawai_id` int unsigned,
	`metode_pembayaran` enum('TUNAI','TRANSFER'),
	`bukti_pembayaran` varchar(256),
	`lpj_belanja_id` int unsigned,
	`file` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `belanja_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`no_dokumen` varchar(256),
	`rba_id` int unsigned,
	`uraian` text,
	`tgl_dokumen` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `dba_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lpj_belanja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tgl_dokumen` date,
	`no_dokumen` varchar(256),
	`jenis` enum('GU','LS','TU'),
	`uraian` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lpj_belanja_id` PRIMARY KEY(`id`)
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
	`jenis_kelamin` enum('LAKI-LAKI','PEREMPUAN'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pegawai_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pendapatan` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`rap_id` int unsigned,
	`tgl_dokumen` date,
	`jumlah` decimal(20,2),
	`keterangan` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pendapatan_id` PRIMARY KEY(`id`)
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
CREATE TABLE `potongan_belanja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`belanja_id` int unsigned,
	`jenis` enum('PPH 21','PPH 22','PPH 23','PPH'),
	`jumlah` decimal(20,2),
	`billing` varchar(256),
	`ntpn` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `potongan_belanja_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profil_blud` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`alamat` varchar(256),
	`no_telp` varchar(256),
	`no_fax` varchar(256),
	`email` varchar(256),
	`website` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profil_blud_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rab` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode_rekening` varchar(256),
	`uraian` text,
	`spesifikasi` varchar(256),
	`sumber_dana` enum('JASA LAYANAN','HIBAH','HASIL KERJA SAMA','LAIN-LAIN PENDAPATAN BLUD YANG SAH','SILPA','APBD'),
	`unit_kerja_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rab_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rap` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kode_rekening` varchar(256),
	`uraian` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rap_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rba` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`no_dokumen` varchar(256),
	`uraian` text,
	`tgl_dokumen` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rba_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rekanan` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`jenis` enum('PERORANGAN','SWASTA','BUMN/BUMD','PEMERINTAH'),
	`alamat` varchar(256),
	`npwp` varchar(15),
	`no_telp` varchar(256),
	`status_rekanan` enum('BIASA','MOU'),
	`bank_id` int unsigned,
	`nama_rekening` varchar(256),
	`no_rekening` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rekanan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rekening_bank` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`bank_id` int unsigned,
	`nama_rekening` varchar(256),
	`no_rekening` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rekening_bank_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rekening_koran` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`rekening_bank_id` int unsigned,
	`tgl_transaksi` timestamp,
	`keterangan` varchar(256),
	`no_referensi` varchar(256),
	`debet` decimal(20,2),
	`kredit` decimal(20,2),
	`keterangan_tambahan` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rekening_koran_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rincian_rba_belanja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`aktivitas_rba_id` int unsigned,
	`rab_id` int unsigned,
	`volume` decimal(20,2),
	`satuan` varchar(256),
	`harga` decimal(20,2),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rincian_rba_belanja_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rincian_rba_pendapatan` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`aktivitas_rba_id` int unsigned,
	`rap_id` int unsigned,
	`jumlah` decimal(20,2),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rincian_rba_pendapatan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sp2d` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tgl_dokumen` date,
	`no_dokumen` varchar(256),
	`spm_id` int unsigned,
	`no_cek` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sp2d_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sp3b` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tgl_mulai` timestamp,
	`tgl_selesai` timestamp,
	`no_dokumen` varchar(256),
	`tgl_dokumen` date,
	`penandatangan_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sp3b_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `spm` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tgl_dokumen` date,
	`no_dokumen` varchar(256),
	`spp_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spm_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `spp` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tgl_dokumen` date,
	`no_dokumen` varchar(256),
	`lpj_belanja_id` int unsigned,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spp_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unit_kerja` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `unit_kerja_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(256),
	`username` varchar(256),
	`password` varchar(256),
	`instansi` varchar(256),
	`role` enum('ADMIN','USER'),
	`pegawai_id` int unsigned,
	`image` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
