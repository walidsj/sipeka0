import { z } from "zod";

export const pendapatanSchema = z.object({
  rapId: z.number(),
  tglDokumen: z.string(),
  jumlah: z.number(),
  keterangan: z.string().nullish(),
});
