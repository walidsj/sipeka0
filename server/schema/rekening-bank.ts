// export const rekeningBankTable = mysqlTable('rekening_bank', {
//    id: serial('id').primaryKey(),
//    bankId: int('bank_id', { unsigned: true }),
//    namaRekening: varchar('nama_rekening', { length: 256 }),
//    noRekening: varchar('no_rekening', { length: 256 }),
//    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
//    updatedAt: timestamp('updated_at', { mode: 'date' })
//        .defaultNow()
//        .onUpdateNow(),
// })

import { z } from "zod";

export const rekeningBankSchema = z.object({
  bankId: z.number(),
  namaRekening: z.string(),
  noRekening: z.string(),
});
