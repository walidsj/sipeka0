import { z } from "zod";

export const profilBludSchema = z.object({
  nama: z.string().min(1),
  alamat: z.string().min(1),
  noTelp: z.string().min(1),
  noFax: z.string().min(1),
  email: z.string().min(1),
  website: z.string().min(1),
});
