import { z } from "zod";

export const sp3bSchema = z.object({
  tglMulai: z.string(),
  tglSelesai: z.string(),
  noDokumen: z.string(),
  tglDokumen: z.string(),
  penandatanganId: z.number(),
});

// Compare this snippet from src/app/api/modules/pegawai/schema.ts:
