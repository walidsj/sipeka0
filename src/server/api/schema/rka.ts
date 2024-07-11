import { z } from 'zod'

export const rkaSchema = z.object({
    rbaId: z.number(),
    noDokumen: z.string().min(1),
    uraian: z.string().min(1),
    tglDokumen: z.date(),
})
