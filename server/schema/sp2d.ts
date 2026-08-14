import { z } from "zod";

export const sp2dSchema = z.object({
  tglDokumen: z.string(),
  noDokumen: z.string(),
  spmId: z.number(),
  noCek: z.string(),
});
