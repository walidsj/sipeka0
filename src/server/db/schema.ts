import { relations } from 'drizzle-orm'
import {
    decimal,
    int,
    mysqlEnum,
    mysqlTable,
    serial,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    username: varchar('username', { length: 256 }),
    password: varchar('password', { length: 256 }),
    instansi: varchar('instansi', { length: 256 }),
    role: mysqlEnum('role', ['ADMIN', 'USER']),
    pegawaiId: int('pegawai_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const bank = mysqlTable('bank', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    kode: varchar('kode', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const pegawai = mysqlTable('pegawai', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    gelarDepan: varchar('gelar_depan', { length: 256 }),
    gelarBelakang: varchar('gelar_belakang', { length: 256 }),
    nip: varchar('nip', { length: 18 }),
    nik: varchar('nik', { length: 16 }),
    jabatan: varchar('jabatan', { length: 256 }),
    npwp: varchar('npwp', { length: 15 }),
    noTelp: varchar('no_telp', { length: 256 }),
    statusPegawai: mysqlEnum('status_pegawai', [
        'PNS',
        'PPPK',
        'NON ASN',
        'MOU',
    ]),
    bankId: int('bank_id', { unsigned: true }),
    namaRekening: varchar('nama_rekening', { length: 256 }),
    noRekening: varchar('no_rekening', { length: 256 }),
    jenisKelamin: mysqlEnum('jenis_kelamin', ['LAKI-LAKI', 'PEREMPUAN']),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rekanan = mysqlTable('rekanan', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    jenis: mysqlEnum('jenis', [
        'PERORANGAN',
        'SWASTA',
        'BUMN/BUMD',
        'PEMERINTAH',
    ]),
    alamat: varchar('alamat', { length: 256 }),
    npwp: varchar('npwp', { length: 15 }),
    noTelp: varchar('no_telp', { length: 256 }),
    statusRekanan: mysqlEnum('status_rekanan', ['BIASA', 'MOU']),
    bankId: int('bank_id', { unsigned: true }),
    namaRekening: varchar('nama_rekening', { length: 256 }),
    noRekening: varchar('no_rekening', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const pengelolaBlud = mysqlTable('pengelola_blud', {
    id: serial('id').primaryKey(),
    pegawaiId: int('pegawai_id', { unsigned: true }),
    role: mysqlEnum('role', [
        'KUASA PENGGUNA ANGGARAN',
        'PEJABAT PELAKSANA TEKNIS KEGIATAN',
        'PEJABAT PEMBUAT KOMITMEN',
        'BENDAHARA PENGELUARAN',
        'BENDAHARA PENERIMAAN',
        'PEJABAT PENATAUSAHAAN KEUANGAN',
        'PENGURUS BARANG',
        'PEJABAT PENGADAAN',
    ]),
    noSk: varchar('no_sk', { length: 256 }),
    tglSk: timestamp('tgl_sk', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const profilBlud = mysqlTable('profil_blud', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    alamat: varchar('alamat', { length: 256 }),
    noTelp: varchar('no_telp', { length: 256 }),
    noFax: varchar('no_fax', { length: 256 }),
    email: varchar('email', { length: 256 }),
    website: varchar('website', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rba = mysqlTable('rba', {
    id: serial('id').primaryKey(),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    uraian: varchar('uraian', { length: 256 }),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const unitKerja = mysqlTable('unit_kerja', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const aktivitasRba = mysqlTable('aktivitas_rba', {
    id: serial('id').primaryKey(),
    kode: varchar('kode', { length: 256 }),
    nama: varchar('nama', { length: 256 }),
    rbaId: int('rba_id', { unsigned: true }),
    jenis: mysqlEnum('jenis', ['BELANJA', 'PENDAPATAN', 'PEMBIAYAAN']),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rincianRbaBelanja = mysqlTable('rincian_rba_belanja', {
    id: serial('id').primaryKey(),
    aktivitasRbaId: int('aktivitas_rba_id', { unsigned: true }),
    rabId: int('rab_id', { unsigned: true }),
    volume: decimal('volume', { precision: 20, scale: 2 }),
    satuan: varchar('satuan', { length: 256 }),
    harga: decimal('harga', { precision: 20, scale: 2 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rincianRbaPendapatan = mysqlTable('rincian_rba_pendapatan', {
    id: serial('id').primaryKey(),
    aktivitasRbaId: int('aktivitas_rba_id', { unsigned: true }),
    rapId: int('rap_id', { unsigned: true }),
    jumlah: decimal('jumlah', { precision: 20, scale: 2 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rab = mysqlTable('rab', {
    id: serial('id').primaryKey(),
    kodeRekening: varchar('kode_rekening', { length: 256 }),
    uraian: varchar('uraian', { length: 256 }),
    spesifikasi: varchar('spesifikasi', { length: 256 }),
    sumberDana: mysqlEnum('sumber_dana', [
        'JASA LAYANAN',
        'HIBAH',
        'HASIL KERJA SAMA',
        'LAIN-LAIN PENDAPATAN BLUD YANG SAH',
        'SILPA',
        'APBD',
    ]),
    unitKerjaId: int('unit_kerja_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rap = mysqlTable('rap', {
    id: serial('id').primaryKey(),
    kodeRekening: varchar('kode_rekening', { length: 256 }),
    uraian: varchar('uraian', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const pendapatan = mysqlTable('pendapatan', {
    id: serial('id').primaryKey(),
    rapId: int('rap_id', { unsigned: true }),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    jumlah: decimal('jumlah', { precision: 20, scale: 2 }),
    keterangan: varchar('keterangan', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const dba = mysqlTable('dba', {
    id: serial('id').primaryKey(),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    rbaId: int('rba_id', { unsigned: true }),
    uraian: varchar('uraian', { length: 256 }),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const belanja = mysqlTable('belanja', {
    id: serial('id').primaryKey(),
    rabId: int('rab_id', { unsigned: true }),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    uraian: varchar('uraian', { length: 256 }),
    jumlah: decimal('jumlah', { precision: 20, scale: 2 }),
    rekananId: int('rekanan_id', { unsigned: true }),
    pegawaiId: int('pegawai_id', { unsigned: true }),
    metodePembayaran: mysqlEnum('metode_pembayaran', ['TUNAI', 'TRANSFER']),
    buktiPembayaran: varchar('bukti_pembayaran', { length: 256 }),
    lpjBelanjaId: int('lpj_belanja_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const lpjBelanjaTable = mysqlTable('lpj_belanja', {
    id: serial('id').primaryKey(),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    jenis: mysqlEnum('jenis', ['GU', 'LS', 'TU']),
    uraian: varchar('uraian', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const potonganBelanja = mysqlTable('potongan_belanja', {
    id: serial('id').primaryKey(),
    belanjaId: int('belanja_id', { unsigned: true }),
    jenis: mysqlEnum('jenis', [
        'PPH 21',
        'PPH 22',
        'PPH 23',
        'PPH 4(2)',
        'PPN',
    ]),
    jumlah: decimal('jumlah', { precision: 20, scale: 2 }),
    billing: varchar('billing', { length: 256 }),
    ntpn: varchar('ntpn', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const sp3bTable = mysqlTable('sp3b', {
    id: serial('id').primaryKey(),
    tglMulai: timestamp('tgl_mulai', { mode: 'date' }),
    tglSelesai: timestamp('tgl_selesai', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    penandatanganId: int('penandatangan_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const sppTable = mysqlTable('spp', {
    id: serial('id').primaryKey(),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    lpjBelanjaId: int('lpj_belanja_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const spmTable = mysqlTable('spm', {
    id: serial('id').primaryKey(),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    sppId: int('spp_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const sp2dTable = mysqlTable('sp2d', {
    id: serial('id').primaryKey(),
    tglDokumen: timestamp('tgl_dokumen', { mode: 'date' }),
    noDokumen: varchar('no_dokumen', { length: 256 }),
    spmId: int('spm_id', { unsigned: true }),
    noCek: varchar('no_cek', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const rekeningBankTable = mysqlTable('rekening_bank', {
    id: serial('id').primaryKey(),
    bankId: int('bank_id', { unsigned: true }),
    namaRekening: varchar('nama_rekening', { length: 256 }),
    noRekening: varchar('no_rekening', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const userRelations = relations(user, ({ one }) => ({
    pegawai: one(pegawai, {
        fields: [user.pegawaiId],
        references: [pegawai.id],
    }),
}))

export const pengelolaBludRelations = relations(pengelolaBlud, ({ one }) => ({
    pegawai: one(pegawai, {
        fields: [pengelolaBlud.pegawaiId],
        references: [pegawai.id],
    }),
}))

export const rincianRbaBelanjaRelations = relations(
    rincianRbaBelanja,
    ({ one }) => ({
        aktivitas: one(aktivitasRba, {
            fields: [rincianRbaBelanja.aktivitasRbaId],
            references: [aktivitasRba.id],
        }),
        rab: one(rab, {
            fields: [rincianRbaBelanja.rabId],
            references: [rab.id],
        }),
    })
)

export const rincianRbaPendapatanRelations = relations(
    rincianRbaPendapatan,
    ({ one }) => ({
        aktivitas: one(aktivitasRba, {
            fields: [rincianRbaPendapatan.aktivitasRbaId],
            references: [aktivitasRba.id],
        }),
        rap: one(rap, {
            fields: [rincianRbaPendapatan.rapId],
            references: [rap.id],
        }),
    })
)

export const rbaRelations = relations(rba, ({ many, one }) => ({
    aktivitas: many(aktivitasRba),
    dba: one(dba),
}))

export const aktivitasRbaRelations = relations(
    aktivitasRba,
    ({ one, many }) => ({
        rba: one(rba, {
            fields: [aktivitasRba.rbaId],
            references: [rba.id],
        }),
        rincianRbaBelanja: many(rincianRbaBelanja),
        rincianRbaPendapatan: many(rincianRbaPendapatan),
    })
)

export const rabRelations = relations(rab, ({ many, one }) => ({
    unitKerja: one(unitKerja, {
        fields: [rab.unitKerjaId],
        references: [unitKerja.id],
    }),
    rincianRbaBelanja: many(rincianRbaBelanja),
    belanja: many(belanja),
}))

export const unitKerjaRelations = relations(unitKerja, ({ many }) => ({
    rab: many(rab),
}))

export const rapRelations = relations(rap, ({ many }) => ({
    rincianRbaPendapatan: many(rincianRbaPendapatan),
    pendapatan: many(pendapatan),
}))

export const pendapatanRelations = relations(pendapatan, ({ one }) => ({
    rap: one(rap, {
        fields: [pendapatan.rapId],
        references: [rap.id],
    }),
}))

export const dbaRelations = relations(dba, ({ one }) => ({
    rba: one(rba, {
        fields: [dba.rbaId],
        references: [rba.id],
    }),
}))

export const belanjaRelations = relations(belanja, ({ one, many }) => ({
    rab: one(rab, {
        fields: [belanja.rabId],
        references: [rab.id],
    }),
    rekanan: one(rekanan, {
        fields: [belanja.rekananId],
        references: [rekanan.id],
    }),
    pegawai: one(pegawai, {
        fields: [belanja.pegawaiId],
        references: [pegawai.id],
    }),
    potonganBelanja: many(potonganBelanja),
    lpjBelanja: one(lpjBelanjaTable, {
        fields: [belanja.lpjBelanjaId],
        references: [lpjBelanjaTable.id],
    }),
}))

export const potonganBelanjaRelations = relations(
    potonganBelanja,
    ({ one }) => ({
        belanja: one(belanja, {
            fields: [potonganBelanja.belanjaId],
            references: [belanja.id],
        }),
    })
)

export const lpjBelanjaTableRelations = relations(
    lpjBelanjaTable,
    ({ many, one }) => ({
        belanja: many(belanja),
        spp: one(sppTable, {
            fields: [lpjBelanjaTable.id],
            references: [sppTable.lpjBelanjaId],
        }),
    })
)

export const rekananRelations = relations(rekanan, ({ one, many }) => ({
    bank: one(bank, {
        fields: [rekanan.bankId],
        references: [bank.id],
    }),
    belanja: many(belanja),
}))

export const pegawaiRelations = relations(pegawai, ({ one, many }) => ({
    bank: one(bank, {
        fields: [pegawai.bankId],
        references: [bank.id],
    }),
    rekanan: many(rekanan),
    belanja: many(belanja),
    pengelolaBlud: many(pengelolaBlud),
    sp3b: many(sp3bTable),
}))

export const sp3bTableRelations = relations(sp3bTable, ({ one }) => ({
    penandatangan: one(pegawai, {
        fields: [sp3bTable.penandatanganId],
        references: [pegawai.id],
    }),
}))

export const sppTableRelations = relations(sppTable, ({ one }) => ({
    lpjBelanja: one(lpjBelanjaTable, {
        fields: [sppTable.lpjBelanjaId],
        references: [lpjBelanjaTable.id],
    }),
    spm: one(spmTable, {
        fields: [sppTable.id],
        references: [spmTable.sppId],
    }),
}))

export const spmTableRelations = relations(spmTable, ({ one }) => ({
    spp: one(sppTable, {
        fields: [spmTable.sppId],
        references: [sppTable.id],
    }),
    sp2d: one(sp2dTable, {
        fields: [spmTable.id],
        references: [sp2dTable.spmId],
    }),
}))

export const sp2dTableRelations = relations(sp2dTable, ({ one }) => ({
    spm: one(spmTable, {
        fields: [sp2dTable.spmId],
        references: [spmTable.id],
    }),
}))

export const rekeningBankTableRelations = relations(
    rekeningBankTable,
    ({ one }) => ({
        bank: one(bank, {
            fields: [rekeningBankTable.bankId],
            references: [bank.id],
        }),
    })
)
