import { z } from "zod";

export const spmSchema = z.object({
  tglDokumen: z.date(),
  noDokumen: z.string(),
  sppId: z.number(),
});
