import { z } from 'zod'

export const kegiatanRkaSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().min(1),
    programRkaId: z.number(),
})
