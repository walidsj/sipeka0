import { z } from 'zod'

export const lpjBelanjaSchema = z.object({
    tglDokumen: z.date(),
    noDokumen: z.string(),
    jenis: z.enum(['GU', 'LS', 'TU']),
    uraian: z.string(),
})
