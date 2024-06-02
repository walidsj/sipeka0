import { pegawai } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const pegawaiSchema = z.object({
    nama: z.string().min(1),
    gelarDepan: z.string().min(1).or(z.literal('')),
    gelarBelakang: z.string().min(1).or(z.literal('')),
    nip: z.string().length(18).or(z.literal('')),
    nik: z.string().length(16),
    jabatan: z.string().min(1),
    npwp: z.string().length(15),
    noTelp: z.string().min(1),
    statusPegawai: z.enum(['PNS', 'PPPK', 'NON ASN', 'MOU']),
    bankId: z.number(),
    namaRekening: z.string().min(1),
    noRekening: z.string().min(1),
})

export const pegawaiRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(pegawai)
                .where(
                    input.search
                        ? or(
                              like(pegawai.nama, `%${input.search}%`),
                              like(pegawai.jabatan, `%${input.search}%`),
                              like(pegawai.nip, `${input.search}%`),
                              like(pegawai.nik, `${input.search}%`)
                          )
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.pegawai.findFirst({
            where: eq(pegawai.id, input),
        })
    }),

    create: userProcedure
        .input(pegawaiSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(pegawai).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(pegawaiSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(pegawai)
                .set(rest)
                .where(eq(pegawai.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(pegawai).where(eq(pegawai.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
