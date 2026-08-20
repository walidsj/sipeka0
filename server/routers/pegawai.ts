import { pegawaiSchema } from "../schema/pegawai";
import { pegawai } from "#server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { asc, count, eq, like, or } from "drizzle-orm";
import { z } from "zod";

export const pegawaiRouter = createTRPCRouter({
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
            like(pegawai.nama, `%${search}%`),
            like(pegawai.jabatan, `%${search}%`),
            like(pegawai.nip, `${search}%`),
            like(pegawai.nik, `${search}%`),
          )
        : undefined;

      const data = await ctx.db
        .select()
        .from(pegawai)
        .where(where)
        .orderBy(asc(pegawai.nama))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await ctx.db.select({ count: count() }).from(pegawai);
      const filtered = await ctx.db
        .select({ count: count() })
        .from(pegawai)
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
