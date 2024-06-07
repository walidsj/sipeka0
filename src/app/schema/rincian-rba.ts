import { z } from 'zod'

export const rincianRbaSchema = z.object({
    aktivitasRbaId: z.number(),
    rabId: z.number(),
    volume: z.number(),
    satuan: z.string().min(1),
    harga: z.number(),
    keterangan: z.string().min(1),
})
