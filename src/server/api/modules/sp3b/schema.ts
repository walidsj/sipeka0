import { z } from 'zod'

export const sp3bSchema = z.object({
    tglMulai: z.date(),
    tglSelesai: z.date(),
    noDokumen: z.string(),
    tglDokumen: z.date(),
    penandatanganId: z.number(),
})

// Compare this snippet from src/app/api/modules/pegawai/schema.ts:
