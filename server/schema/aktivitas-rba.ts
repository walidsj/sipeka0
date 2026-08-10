import { z } from "zod";

export const aktivitasRbaSchema = z.object({
  kode: z.string().min(1),
  nama: z.string().min(1),
  rbaId: z.number(),
  subKegiatanRkaId: z.number().nullish(),
  jenis: z.enum(["BELANJA", "PENDAPATAN", "PEMBIAYAAN"]),
});
