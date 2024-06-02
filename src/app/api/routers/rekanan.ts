import { rekanan } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const rekananSchema = z.object({
    nama: z.string().min(1),
    jenis: z.enum(['PERORANGAN', 'SWASTA', 'BUMN/BUMD', 'PEMERINTAH']),
    alamat: z.string().min(1),
    npwp: z.string().length(15),
    noTelp: z.string().min(1),
    namaPimpinan: z.string().min(1),
    namaPic: z.string().min(1),
    noPic: z.string().min(1),
    statusRekanan: z.enum(['BIASA', 'MOU']),
    bankId: z.number(),
    namaRekening: z.string().min(1),
    noRekening: z.string().min(1),
})

export const rekananRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.rekanan.findMany({})
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rekanan.findFirst({
            where: eq(rekanan.id, input),
        })
    }),

    create: userProcedure
        .input(rekananSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(rekanan).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rekananSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(rekanan)
                .set(rest)
                .where(eq(rekanan.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rekanan).where(eq(rekanan.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
