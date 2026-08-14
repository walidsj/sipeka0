import { z } from "zod";

export const rbaSchema = z.object({
  noDokumen: z.string().min(1),
  uraian: z.string().min(1),
  tglDokumen: z.string(),
});
