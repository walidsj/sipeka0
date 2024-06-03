import { relations } from 'drizzle-orm'
import {
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
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const bank = mysqlTable('bank', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    kode: varchar('kode', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
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
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
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
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
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
    tglSk: timestamp('tgl_sk'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
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

export const profilBlud = mysqlTable('profil_blud', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 256 }),
    alamat: varchar('alamat', { length: 256 }),
    noTelp: varchar('no_telp', { length: 256 }),
    noFax: varchar('no_fax', { length: 256 }),
    email: varchar('email', { length: 256 }),
    website: varchar('website', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})
