import { z } from 'zod'

export const rekeningKoranSchema = z.object({
    rekeningBankId: z.number(),
    tglTransaksi: z.date(),
    keterangan: z.string(),
    noReferensi: z.string(),
    debet: z.number(),
    kredit: z.number(),
})
