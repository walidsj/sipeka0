import { z } from 'zod'

export const bankSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().length(3),
})
