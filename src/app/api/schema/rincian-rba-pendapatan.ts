import { z } from 'zod'

export const rincianRbaPendapatanSchema = z.object({
    aktivitasRbaId: z.number(),
    rapId: z.number().nullish(),
    jumlah: z.number().nullish(),
})
