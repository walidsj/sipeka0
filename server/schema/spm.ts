import { z } from "zod";

export const spmSchema = z.object({
  tglDokumen: z.string(),
  noDokumen: z.string(),
  sppId: z.number(),
});
