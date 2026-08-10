import { programRkaSchema } from "../schema/program-rka";
import { programRka } from "server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const programRkaRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(programRka)
        .where(
          input.search
            ? or(
                like(programRka.nama, `%${input.search}%`),
                like(programRka.kode, `%${input.search}%`),
              )
            : undefined,
        );
    }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.query.programRka.findFirst({
      where: eq(programRka.id, input),
    });
  }),

  create: userProcedure
    .input(programRkaSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(programRka).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(programRkaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(programRka)
        .set(input)
        .where(eq(programRka.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(programRka).where(eq(programRka.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
