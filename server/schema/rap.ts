import { z } from "zod";

export const rapSchema = z.object({
  kodeRekening: z.string().min(1),
  uraian: z.string().min(1),
});
