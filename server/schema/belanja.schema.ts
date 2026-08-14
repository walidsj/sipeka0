import { z } from "zod";

export const belanjaSchema = z.object({
  rabId: z.number().nullable(),
  tglDokumen: z.string(),
  noDokumen: z.string(),
  uraian: z.string(),
  jumlah: z.number(),
  rekananId: z.number().nullish(),
  pegawaiId: z.number().nullish(),
  metodePembayaran: z.enum(["TUNAI", "TRANSFER"]),
  buktiPembayaran: z.string(),
  lpjBelanjaId: z.number().nullish(),
});

export type BelanjaSchema = z.infer<typeof belanjaSchema>;

export const potonganBelanjaSchema = z.object({
  belanjaId: z.number(),
  jenis: z.enum(["PPH 21", "PPH 22", "PPH 23", "PPH 4(2)", "PPN"]),
  jumlah: z.number(),
  billing: z.string().length(15),
  ntpn: z.string(),
});

export type PotonganBelanjaSchema = z.infer<typeof potonganBelanjaSchema>;
