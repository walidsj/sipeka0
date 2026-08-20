import { sppSchema } from "../schema/spp";
import { sppTable } from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { getRekening } from "@/data/rekening";

export const sppRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        haveSpm: z.boolean().optional(),
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
          await ctx.db.select({ count: count() }).from(sppTable)
        )[0].count ?? 0;

      let spp = await ctx.db.query.sppTable.findMany({
        orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
        with: {
          lpjBelanja: {
            with: {
              belanja: true,
            },
          },
          spm: {
            with: {
              sp2d: true,
            },
          },
        },
        where: and(
          input.startDate
            ? gte(sppTable.tglDokumen, input.startDate)
            : undefined,
          input.endDate ? lte(sppTable.tglDokumen, input.endDate) : undefined,
        ),
      });

      if (input.haveSpm === true) {
        spp = spp.filter((item) => item.spm);
      }

      if (input.haveSpm === false) {
        spp = spp.filter((item) => !item.spm);
      }

      if (input.search) {
        const q = input.search.toLowerCase();
        spp = spp.filter(
          (item) =>
            item.noDokumen?.toLowerCase().includes(q) ||
            item.lpjBelanja?.uraian?.toLowerCase().includes(q),
        );
      }

      const dataFiltered = spp.length;
      const pageSize = input.pageSize ?? dataFiltered;
      const firstRow = (page - 1) * pageSize + 1;
      const lastRow = (page - 1) * pageSize + Math.min(pageSize, dataFiltered - (page - 1) * pageSize);
      const pageCount = Math.ceil(dataFiltered / pageSize);

      const data = spp
        .slice((page - 1) * pageSize, page * pageSize)
        .map((item) => ({
          id: item.id,
          tglDokumen: item.tglDokumen,
          noDokumen: item.noDokumen,
          uraian: item.lpjBelanja?.uraian,
          jumlah: item.lpjBelanja?.belanja.reduce(
            (acc, curr) => acc + Number(curr.jumlah),
            0,
          ),
          spm: item?.spm
            ? {
                noDokumen: item.spm.noDokumen,
                tglDokumen: item.spm.tglDokumen,
              }
            : null,
          sp2d: item?.spm?.sp2d
            ? {
                noDokumen: item.spm.sp2d.noDokumen,
                tglDokumen: item.spm.sp2d.tglDokumen,
              }
            : null,
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
    const sppData = await ctx.db.query.sppTable.findFirst({
      where: eq(sppTable.id, input),
      with: {
        lpjBelanja: {
          with: {
            belanja: {
              with: {
                rab: true,
              },
            },
          },
        },
      },
    });

    if (!sppData) {
      return null;
    }

    const rekeningLevel6 = getRekening(ctx.session?.tahun).level6;

    // add kode and uraian to kodeRekening rab
    return {
      ...sppData,
      lpjBelanja: {
        ...sppData.lpjBelanja,
        belanja:
          sppData.lpjBelanja?.belanja.map((item) => ({
            ...item,
            rab: {
              ...item.rab,
              rekening: rekeningLevel6.find(
                (rekening) => rekening.kode === item.rab?.kodeRekening,
              ),
            },
          })) || [],
      },
    };
  }),

  create: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(sppSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sppTable).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.object({ id: z.number() }).merge(sppSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(sppTable).set(input).where(eq(sppTable.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(sppTable).where(eq(sppTable.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getLatest: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.sppTable.findFirst({
      orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
    });
  }),
});
