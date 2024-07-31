import { rekeningBankTable, rekeningKoranTable } from '@/server/db/schema'
import {
    createTRPCRouter,
    pengelolaProcedure,
    userProcedure,
} from '@/server/trpc'
import { asc, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'
import { rekeningKoranSchema } from '../schema/rekening-koran'
import { Base64 } from 'js-base64'

export const rekeningKoranRouter = createTRPCRouter({
    getAllByRekeningBankId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.rekeningKoranTable.findMany({
                where: eq(rekeningKoranTable.rekeningBankId, input),
                orderBy: [
                    asc(rekeningKoranTable.tglTransaksi),
                    asc(rekeningKoranTable.createdAt),
                ],
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rekeningKoranTable.findFirst({
            where: eq(rekeningKoranTable.id, input),
        })
    }),

    create: userProcedure
        .input(rekeningKoranSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(rekeningKoranTable).values({
                ...input,
                debet: String(input.debet),
                kredit: String(input.kredit),
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rekeningKoranSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(rekeningKoranTable)
                .set({
                    ...input,
                    debet: String(input.debet),
                    kredit: String(input.kredit),
                })
                .where(eq(rekeningKoranTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: pengelolaProcedure([
        'BENDAHARA PENGELUARAN',
        'BENDAHARA PENERIMAAN',
    ])
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(rekeningKoranTable)
                .where(eq(rekeningKoranTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    importCsv: pengelolaProcedure([
        'BENDAHARA PENGELUARAN',
        'BENDAHARA PENERIMAAN',
    ])
        .input(z.object({ fileCsv: z.string().refine(Base64.isValid) }))
        .mutation(async ({ ctx, input }) => {
            const csv = Base64.decode(input.fileCsv)

            const lines = csv.split(/\r?\n/)
            const data = lines.map((line) => {
                const [
                    noRekening,
                    rupiah,
                    tglTransaksiRaw,
                    keterangan,
                    noReferensi,
                    kredit,
                    debet,
                    saldo,
                ] = line.split(';')

                return {
                    noRekening,
                    rupiah,
                    tglTransaksiRaw,
                    keterangan,
                    noReferensi,
                    kredit,
                    debet,
                    saldo,
                }
            })

            const noRekeningListUnique = Array.from(
                new Set(data.map((item) => item.noRekening))
            )

            const rekeningBankIds = await ctx.db
                .select()
                .from(rekeningBankTable)
                .where(
                    inArray(rekeningBankTable.noRekening, noRekeningListUnique)
                )

            const inputData = data.map((item) => {
                const rekeningBankId = rekeningBankIds.find(
                    (rekeningBank) =>
                        rekeningBank.noRekening === item.noRekening
                )?.id
                if (rekeningBankId) {
                    return {
                        rekeningBankId,
                        tglTransaksi: new Date(item.tglTransaksiRaw),
                        keterangan: item.keterangan,
                        noReferensi: item.noReferensi,
                        debet: String(
                            Number(
                                item.debet.replace(/\./g, '').replace(/,/g, '.')
                            ).toFixed(2)
                        ),
                        kredit: String(
                            Number(
                                item.kredit
                                    .replace(/\./g, '')
                                    .replace(/,/g, '.')
                            ).toFixed(2)
                        ),
                        keteranganTambahan: null,
                    }
                } else {
                    return
                }
            })

            await ctx.db
                .insert(rekeningKoranTable)
                .values(inputData.filter((item) => item !== undefined))

            return { message: 'Data berhasil diimport' }
        }),
})
