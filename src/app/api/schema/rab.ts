import { z } from 'zod'

export const rabSchema = z.object({
    kodeRekening: z.string().min(1),
    uraian: z.string().min(1),
    spesifikasi: z.string().nullish(),
})
