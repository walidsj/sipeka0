import { pegawaiSchema } from "../schema/pegawai";
import { pegawai } from "#server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { asc, eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const pegawaiRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
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
                like(pegawai.nik, `${input.search}%`),
              )
            : undefined,
        )
        .orderBy(asc(pegawai.nama));
    }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.query.pegawai.findFirst({
      where: eq(pegawai.id, input),
    });
  }),

  create: userProcedure
    .input(pegawaiSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pegawai).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(pegawaiSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(pegawai).set(input).where(eq(pegawai.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(pegawai).where(eq(pegawai.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
