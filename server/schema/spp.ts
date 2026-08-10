// export const sppTable = mysqlTable('spp', {
//    id: serial('id').primaryKey(),
//    tglJurnal: timestamp('tgl_dokumen', { mode: 'date' }),
//    noDokumen: varchar('no_dokumen', { length: 256 }),
//    lpjBelanjaId: int('lpj_belanja_id', { unsigned: true }),
//    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
//    updatedAt: timestamp('updated_at', { mode: 'date' })
//        .defaultNow()
//        .onUpdateNow(),
// })

import { z } from "zod";

export const sppSchema = z.object({
  tglDokumen: z.date(),
  noDokumen: z.string(),
  lpjBelanjaId: z.number(),
});
