import { profilBludSchema } from '../schema/profil-blud'
import { profilBlud } from '@/server/db/schema'
import { createTRPCRouter, userProcedure, adminProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'

export const profilBludRouter = createTRPCRouter({
    get: userProcedure.query(async ({ ctx }) => {
        const currentProfilBlud = await ctx.db.query.profilBlud.findFirst({})

        if (!currentProfilBlud) {
            return null
        }

        return {
            nama: currentProfilBlud.nama,
            alamat: currentProfilBlud.alamat,
            noTelp: currentProfilBlud.noTelp,
            noFax: currentProfilBlud.noFax,
            email: currentProfilBlud.email,
            website: currentProfilBlud.website,
        } as Pick<
            typeof profilBlud.$inferSelect,
            'nama' | 'alamat' | 'noFax' | 'noTelp' | 'email' | 'website'
        >
    }),

    createOrUpdate: adminProcedure
        .input(profilBludSchema)
        .mutation(async ({ ctx, input }) => {
            const currentProfilBlud = await ctx.db.query.profilBlud.findFirst(
                {}
            )

            if (!currentProfilBlud) {
                await ctx.db.insert(profilBlud).values(input)
            } else {
                await ctx.db
                    .update(profilBlud)
                    .set(input)
                    .where(eq(profilBlud.id, currentProfilBlud.id))
            }

            return { message: 'Data berhasil diupdate' }
        }),
})
