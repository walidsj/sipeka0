import { z } from 'zod'

export const rincianRbaBelanjaSchema = z.object({
    aktivitasRbaId: z.number(),
    rabId: z.number().nullish(),
    volume: z.number().nullish(),
    satuan: z.string().min(1).nullish(),
    harga: z.number().nullish(),
})
