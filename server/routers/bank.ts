import { bank } from "#server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { count, eq, like, or } from "drizzle-orm";
import { z } from "zod";
import { bankSchema } from "../schema/bank";

export const bankRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const pageSize = input.pageSize ?? 10;
      const search = input.search ?? "";

      const where = search
        ? or(
            like(bank.nama, `%${search}%`),
            like(bank.kode, `${search}%`),
          )
        : undefined;

      const data = await ctx.db
        .select()
        .from(bank)
        .where(where)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await ctx.db.select({ count: count() }).from(bank);
      const filtered = await ctx.db
        .select({ count: count() })
        .from(bank)
        .where(where);

      const dataFiltered = filtered[0].count;
      const dataTotal = total[0].count;
      const firstRow = (page - 1) * pageSize + 1;
      const lastRow = (page - 1) * pageSize + data.length;
      const pageCount = Math.ceil(dataFiltered / pageSize);

      return {
        data,
        meta: {
          pagination: {
            dataTotal,
            dataFiltered,
            page,
            pageCount,
            pageSize,
            firstRow,
            lastRow,
          },
        },
      };
    }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.query.bank.findFirst({
      where: eq(bank.id, input),
    });
  }),

  create: userProcedure.input(bankSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(bank).values(input);

    return { message: "Data berhasil ditambahkan" };
  }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(bankSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(bank).set(input).where(eq(bank.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(bank).where(eq(bank.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
