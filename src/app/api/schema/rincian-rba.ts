import { z } from 'zod'

export const rincianRbaSchema = z.object({
    aktivitasRbaId: z.number(),
    rabId: z.number().nullish(),
    rapId: z.number().nullish(),
    volume: z.number().nullish(),
    satuan: z.string().min(1).nullish(),
    harga: z.number().nullish(),
    jumlah: z.number().nullish(),
})
