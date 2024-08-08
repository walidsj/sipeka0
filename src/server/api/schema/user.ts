import { z } from 'zod'

export const userSchema = z.object({
    nama: z.string().min(1),
    username: z.string().min(1),
    instansi: z.string().min(1),
    role: z.enum(['USER', 'ADMIN']),
    pegawaiId: z.number().nullish(),
    image: z.string().nullish(),
})
