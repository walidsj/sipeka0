import { belanja, lpjBelanjaTable } from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { and, asc, count, desc, eq, gte, isNull, like, lte, or } from "drizzle-orm";
import { z } from "zod";
import { lpjBelanjaSchema } from "../schema/lpj_belanja";

export const lpjBelanjaRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        haveSpp: z.boolean().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;

      const dataTotal =
        (
          await ctx.db
            .select({ count: count() })
            .from(lpjBelanjaTable)
        )[0].count ?? 0;

      let lpjBelanja = await ctx.db.query.lpjBelanjaTable.findMany({
        orderBy: [
          desc(lpjBelanjaTable.tglDokumen),
          desc(lpjBelanjaTable.noDokumen),
          desc(lpjBelanjaTable.createdAt),
        ],
        with: {
          belanja: true,
          spp: true,
        },
        where: and(
          input.search
            ? or(
                like(lpjBelanjaTable.noDokumen, `%${input.search}%`),
                like(lpjBelanjaTable.uraian, `%${input.search}%`),
              )
            : undefined,
          input.startDate
            ? gte(lpjBelanjaTable.tglDokumen, input.startDate)
            : undefined,
          input.endDate
            ? lte(lpjBelanjaTable.tglDokumen, input.endDate)
            : undefined,
        ),
      });

      if (input.haveSpp === true) {
        lpjBelanja = lpjBelanja.filter((item) => item.spp);
      }

      if (input.haveSpp === false) {
        lpjBelanja = lpjBelanja.filter((item) => !item.spp);
      }

      const dataFiltered = lpjBelanja.length;
      const pageSize = input.pageSize ?? dataFiltered;
      const firstRow = (page - 1) * pageSize + 1;
      const lastRow = (page - 1) * pageSize + Math.min(pageSize, dataFiltered - (page - 1) * pageSize);
      const pageCount = Math.ceil(dataFiltered / pageSize);

      const data = lpjBelanja
        .slice((page - 1) * pageSize, page * pageSize)
        .map((item) => ({
          id: item.id,
          tglDokumen: item.tglDokumen,
          noDokumen: item.noDokumen,
          uraian: item.uraian,
          jumlah: item.belanja.reduce(
            (acc, curr) => acc + Number(curr.jumlah),
            0,
          ),
          jenis: item.jenis,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

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
    return await ctx.db.query.lpjBelanjaTable.findFirst({
      where: eq(lpjBelanjaTable.id, input),
    });
  }),

  create: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(lpjBelanjaSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(lpjBelanjaTable).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.object({ id: z.number() }).merge(lpjBelanjaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(lpjBelanjaTable)
        .set(input)
        .where(eq(lpjBelanjaTable.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lpjBelanjaTable).where(eq(lpjBelanjaTable.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getLatest: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.lpjBelanjaTable.findFirst({
      orderBy: [
        desc(lpjBelanjaTable.tglDokumen),
        desc(lpjBelanjaTable.noDokumen),
      ],
    });
  }),

  getBelanjaByEmptyLpjBelanja: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.belanja.findMany({
      where: isNull(belanja.lpjBelanjaId),
      orderBy: [
        desc(belanja.tglDokumen),
        desc(belanja.noDokumen),
        desc(belanja.createdAt),
      ],
    });
  }),

  getBelanjaByLpjBelanjaId: userProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.belanja.findMany({
        where: eq(belanja.lpjBelanjaId, input),
        orderBy: [
          asc(belanja.tglDokumen),
          asc(belanja.noDokumen),
          asc(belanja.createdAt),
        ],
        with: {
          rab: true,
          potonganBelanja: true,
        },
      });
    }),

  addItemToLpjBelanja: userProcedure
    .input(z.object({ id: z.number(), lpjBelanjaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(belanja)
        .set({ lpjBelanjaId: input.lpjBelanjaId })
        .where(eq(belanja.id, input.id));

      return { message: "Data berhasil ditambahkan" };
    }),

  deleteLpjBelanjaIdBelanja: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(belanja)
        .set({ lpjBelanjaId: null })
        .where(eq(belanja.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
