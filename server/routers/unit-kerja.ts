import { unitKerjaSchema } from "../schema/unit-kerja";
import { unitKerja } from "server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const unitKerjaRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(unitKerja)
        .where(
          input.search
            ? or(like(unitKerja.nama, `%${input.search}%`))
            : undefined,
        );
    }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.query.unitKerja.findFirst({
      where: eq(unitKerja.id, input),
    });
  }),

  create: userProcedure
    .input(unitKerjaSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(unitKerja).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(unitKerjaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(unitKerja)
        .set(input)
        .where(eq(unitKerja.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(unitKerja).where(eq(unitKerja.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
