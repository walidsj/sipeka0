import { z } from 'zod'

export const sp2dSchema = z.object({
    tglDokumen: z.date(),
    noDokumen: z.string(),
    spmId: z.number(),
    noCek: z.string(),
})
