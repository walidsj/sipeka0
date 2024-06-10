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
    namaPimpinan: varchar('nama_pimpinan', { length: 256 }),
    namaPic: varchar('pic', { length: 256 }),
    noPic: varchar('no_pic', { length: 256 }),
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

export const programRka = mysqlTable('program_rka', {
    id: serial('id').primaryKey(),
    kode: varchar('kode', { length: 256 }),
    nama: varchar('nama', { length: 256 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const kegiatanRka = mysqlTable('kegiatan_rka', {
    id: serial('id').primaryKey(),
    kode: varchar('kode', { length: 256 }),
    nama: varchar('nama', { length: 256 }),
    programRkaId: int('program_rka_id', { unsigned: true }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
        .defaultNow()
        .onUpdateNow(),
})

export const subKegiatanRka = mysqlTable('sub_kegiatan_rka', {
    id: serial('id').primaryKey(),
    kode: varchar('kode', { length: 256 }),
    nama: varchar('nama', { length: 256 }),
    kegiatanRkaId: int('kegiatan_rka_id', { unsigned: true }),
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
    rbaId: int('sub_kegiatan_rka_id', { unsigned: true }),
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

export const programRkaRelations = relations(programRka, ({ many }) => ({
    kegiatan: many(kegiatanRka),
}))

export const kegiatanRkaRelations = relations(kegiatanRka, ({ one, many }) => ({
    program: one(programRka, {
        fields: [kegiatanRka.programRkaId],
        references: [programRka.id],
    }),
    subKegiatan: many(subKegiatanRka),
}))

export const subKegiatanRkaRelations = relations(subKegiatanRka, ({ one }) => ({
    kegiatan: one(kegiatanRka, {
        fields: [subKegiatanRka.kegiatanRkaId],
        references: [kegiatanRka.id],
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

export const rbaRelations = relations(rba, ({ many }) => ({
    aktivitas: many(aktivitasRba),
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
