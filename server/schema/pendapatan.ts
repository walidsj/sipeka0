import { z } from "zod";

export const pendapatanSchema = z.object({
  rapId: z.number(),
  tglDokumen: z.date(),
  jumlah: z.number(),
  keterangan: z.string().nullish(),
});
