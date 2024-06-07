import { z } from 'zod'

export const unitKerjaSchema = z.object({
    nama: z.string().min(1),
})
