import { z } from 'zod'

export const belanjaSchema = z.object({
    rabId: z.number(),
    tglDokumen: z.date(),
    noDokumen: z.string(),
    uraian: z.string(),
    jumlah: z.number(),
    rekananId: z.number().nullish(),
    pegawaiId: z.number().nullish(),
    metodePembayaran: z.enum(['TUNAI', 'TRANSFER']),
    buktiPembayaran: z.string(),
})
