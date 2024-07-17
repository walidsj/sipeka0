import { sp2dTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'
import { rekeningLevel6 } from '@/data/rekening'
import { sp2dSchema } from '../schema/sp2d'

export const sp2dRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.sp2dTable.findMany({
                orderBy: [
                    desc(sp2dTable.tglDokumen),
                    desc(sp2dTable.noDokumen),
                ],
                with: {
                    spm: {
                        with: {
                            spp: {
                                with: {
                                    lpjBelanja: true,
                                },
                            },
                        },
                    },
                },
                where: input.search
                    ? or(like(sp2dTable.noDokumen, `%${input.search}%`))
                    : undefined,
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const sp2dData = await ctx.db.query.sp2dTable.findFirst({
            where: eq(sp2dTable.id, input),
            with: {
                spm: {
                    with: {
                        spp: {
                            with: {
                                lpjBelanja: {
                                    with: {
                                        belanja: {
                                            with: {
                                                rab: true,
                                                rekanan: {
                                                    with: {
                                                        bank: true,
                                                    },
                                                },
                                                pegawai: {
                                                    with: {
                                                        bank: true,
                                                    },
                                                },
                                                potonganBelanja: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!sp2dData) {
            return null
        }

        // add kode and uraian to kodeRekening rab
        return {
            ...sp2dData,
            spm: {
                ...sp2dData.spm,
                spp: {
                    ...sp2dData.spm?.spp,
                    lpjBelanja: {
                        ...sp2dData.spm?.spp?.lpjBelanja,
                        belanja:
                            sp2dData.spm?.spp?.lpjBelanja?.belanja.map(
                                (item) => ({
                                    ...item,
                                    rab: {
                                        ...item.rab,
                                        rekening: rekeningLevel6.find(
                                            (rekening) =>
                                                rekening.kode ===
                                                item.rab?.kodeRekening
                                        ),
                                    },
                                })
                            ) || [],
                    },
                },
            },
        }
    }),

    create: userProcedure.input(sp2dSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(sp2dTable).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(sp2dSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(sp2dTable)
                .set(input)
                .where(eq(sp2dTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(sp2dTable).where(eq(sp2dTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.sp2dTable.findFirst({
            orderBy: [desc(sp2dTable.tglDokumen), desc(sp2dTable.noDokumen)],
        })
    }),
})
