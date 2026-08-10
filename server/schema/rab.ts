import { z } from "zod";

export const rabSchema = z.object({
  kodeRekening: z.string().min(1),
  uraian: z.string().min(1),
  spesifikasi: z.string().nullish(),
  sumberDana: z.enum([
    "JASA LAYANAN",
    "HIBAH",
    "HASIL KERJA SAMA",
    "LAIN-LAIN PENDAPATAN BLUD YANG SAH",
    "SILPA",
    "APBD",
  ]),
  unitKerjaId: z.number(),
});
