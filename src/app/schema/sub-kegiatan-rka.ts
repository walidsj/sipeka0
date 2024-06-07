import { z } from 'zod'

export const subKegiatanRkaSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().min(1),
    kegiatanRkaId: z.number(),
})
