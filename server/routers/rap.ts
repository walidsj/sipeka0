import { rapSchema } from "../schema/rap";
import { getRekening } from "@/data/rekening";
import { rap } from "#server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { count, eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const rapRouter = createTRPCRouter({
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
      const search = input.search ?? "";
      const where = search ? or(like(rap.uraian, `%${search}%`)) : undefined;

      const dataTotal =
        (await ctx.db.select({ count: count() }).from(rap))[0].count ?? 0;

      const rapList = await ctx.db.query.rap.findMany({
        where,
        limit: input.pageSize,
        offset: input.pageSize ? (page - 1) * input.pageSize : undefined,
      });

      const rekeningLevel6 = getRekening(ctx.session?.tahun).level6;

      const data = rapList.map((rap) => {
        return {
          ...rap,
          uraianRekening: rekeningLevel6.find(
            (rekening) => rekening.kode === rap.kodeRekening,
          )?.uraian,
        };
      });

      const dataFiltered = data.length;
      const pageSize = input.pageSize ?? dataFiltered;
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
    return await ctx.db.query.rap.findFirst({
      where: eq(rap.id, input),
    });
  }),

  create: userProcedure.input(rapSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(rap).values(input);

    return { message: "Data berhasil ditambahkan" };
  }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(rapSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(rap).set(input).where(eq(rap.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(rap).where(eq(rap.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
