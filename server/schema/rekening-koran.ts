import { z } from "zod";

export const rekeningKoranSchema = z.object({
  rekeningBankId: z.number(),
  tglTransaksi: z.string(),
  keterangan: z.string(),
  noReferensi: z.string(),
  debet: z.number(),
  kredit: z.number(),
  keteranganTambahan: z.string().optional(),
});
