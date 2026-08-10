import { z } from "zod";

export const rekananSchema = z.object({
  nama: z.string().min(1),
  jenis: z.enum(["PERORANGAN", "SWASTA", "BUMN/BUMD", "PEMERINTAH"]),
  alamat: z.string().min(1),
  npwp: z.string().length(15),
  noTelp: z.string().min(1),
  statusRekanan: z.enum(["BIASA", "MOU"]),
  bankId: z.number(),
  namaRekening: z.string().min(1),
  noRekening: z.string().min(1),
});
