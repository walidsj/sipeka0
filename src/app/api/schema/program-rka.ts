import { z } from 'zod'

export const programRkaSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().min(1),
})
