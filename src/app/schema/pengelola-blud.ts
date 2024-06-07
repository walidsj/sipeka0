import { z } from 'zod'

export const pengelolaBludSchema = z.object({
    pegawaiId: z.number(),
    role: z.enum([
        'KUASA PENGGUNA ANGGARAN',
        'PEJABAT PELAKSANA TEKNIS KEGIATAN',
        'PEJABAT PEMBUAT KOMITMEN',
        'BENDAHARA PENGELUARAN',
        'BENDAHARA PENERIMAAN',
        'PEJABAT PENATAUSAHAAN KEUANGAN',
        'PENGURUS BARANG',
        'PEJABAT PENGADAAN',
    ]),
    noSk: z.string().min(1),
    tglSk: z.date(),
})
