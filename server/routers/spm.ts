import { spmSchema } from "../schema/spm";
import { spmTable } from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { getRekening } from "@/data/rekening";

export const spmRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        haveSp2d: z.boolean().optional(),
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
          await ctx.db.select({ count: count() }).from(spmTable)
        )[0].count ?? 0;

      let spm = await ctx.db.query.spmTable.findMany({
        orderBy: [desc(spmTable.tglDokumen), desc(spmTable.noDokumen)],
        with: {
          spp: {
            with: {
              lpjBelanja: {
                with: {
                  belanja: true,
                },
              },
            },
          },
          sp2d: true,
        },
        where: and(
          input.startDate
            ? gte(spmTable.tglDokumen, input.startDate)
            : undefined,
          input.endDate ? lte(spmTable.tglDokumen, input.endDate) : undefined,
        ),
      });

      if (input.haveSp2d === true) {
        spm = spm.filter((item) => item.sp2d);
      }

      if (input.haveSp2d === false) {
        spm = spm.filter((item) => !item.sp2d);
      }

      if (input.search) {
        const q = input.search.toLowerCase();
        spm = spm.filter(
          (item) =>
            item.noDokumen?.toLowerCase().includes(q) ||
            item.spp?.lpjBelanja?.uraian?.toLowerCase().includes(q),
        );
      }

      const dataFiltered = spm.length;
      const pageSize = input.pageSize ?? dataFiltered;
      const firstRow = (page - 1) * pageSize + 1;
      const lastRow = (page - 1) * pageSize + Math.min(pageSize, dataFiltered - (page - 1) * pageSize);
      const pageCount = Math.ceil(dataFiltered / pageSize);

      const data = spm
        .slice((page - 1) * pageSize, page * pageSize)
        .map((item) => ({
          id: item.id,
          tglDokumen: item.tglDokumen,
          noDokumen: item.noDokumen,
          uraian: item.spp?.lpjBelanja?.uraian,
          jumlah: item.spp?.lpjBelanja?.belanja.reduce(
            (acc, curr) => acc + Number(curr.jumlah),
            0,
          ),
          sp2d: item?.sp2d
            ? {
                noDokumen: item.sp2d.noDokumen,
                tglDokumen: item.sp2d.tglDokumen,
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
    const spmData = await ctx.db.query.spmTable.findFirst({
      where: eq(spmTable.id, input),
      with: {
        spp: {
          with: {
            lpjBelanja: {
              with: {
                belanja: {
                  with: {
                    rab: true,
                    rekanan: {
                      with: {
                        bank: true,
                      },
                    },
                    pegawai: {
                      with: {
                        bank: true,
                      },
                    },
                    potonganBelanja: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!spmData) {
      return null;
    }

    const rekeningLevel6 = getRekening(ctx.session?.tahun).level6;

    // add kode and uraian to kodeRekening rab
    return {
      ...spmData,
      spp: {
        ...spmData.spp,
        lpjBelanja: {
          ...spmData.spp?.lpjBelanja,
          belanja:
            spmData.spp?.lpjBelanja?.belanja.map((item) => ({
              ...item,
              rab: {
                ...item.rab,
                rekening: rekeningLevel6.find(
                  (rekening) => rekening.kode === item.rab?.kodeRekening,
                ),
              },
            })) || [],
        },
      },
    };
  }),

  create: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(spmSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(spmTable).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.object({ id: z.number() }).merge(spmSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(spmTable).set(input).where(eq(spmTable.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(spmTable).where(eq(spmTable.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getLatest: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.spmTable.findFirst({
      orderBy: [desc(spmTable.tglDokumen), desc(spmTable.noDokumen)],
    });
  }),
});
