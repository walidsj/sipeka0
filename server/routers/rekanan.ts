import { rekananSchema } from "../schema/rekanan";
import { rekanan } from "#server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { asc, count, eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const rekananRouter = createTRPCRouter({
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
            like(rekanan.nama, `%${search}%`),
            like(rekanan.nama, `%${search.split("").join("% ")}%`),
            like(rekanan.alamat, `%${search}%`),
            like(rekanan.namaRekening, `${search}%`),
          )
        : undefined;

      const data = await ctx.db
        .select()
        .from(rekanan)
        .where(where)
        .orderBy(asc(rekanan.nama))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await ctx.db.select({ count: count() }).from(rekanan);
      const filtered = await ctx.db
        .select({ count: count() })
        .from(rekanan)
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
    return await ctx.db.query.rekanan.findFirst({
      where: eq(rekanan.id, input),
    });
  }),

  create: userProcedure
    .input(rekananSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(rekanan).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(rekananSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(rekanan).set(input).where(eq(rekanan.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(rekanan).where(eq(rekanan.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
