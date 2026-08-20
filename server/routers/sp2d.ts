import { sp2dTable } from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { getRekening } from "@/data/rekening";
import { sp2dSchema } from "../schema/sp2d";

export const sp2dRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
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
          await ctx.db.select({ count: count() }).from(sp2dTable)
        )[0].count ?? 0;

      const sp2d = await ctx.db.query.sp2dTable.findMany({
        orderBy: [desc(sp2dTable.tglDokumen), desc(sp2dTable.noDokumen)],
        with: {
          spm: {
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
            },
          },
        },
        where: and(
          input.startDate
            ? gte(sp2dTable.tglDokumen, input.startDate)
            : undefined,
          input.endDate ? lte(sp2dTable.tglDokumen, input.endDate) : undefined,
        ),
      });

      if (input.search) {
        const q = input.search.toLowerCase();
        for (let i = sp2d.length - 1; i >= 0; i--) {
          const item = sp2d[i];
          const match =
            item.noDokumen?.toLowerCase().includes(q) ||
            item.spm?.spp?.lpjBelanja?.uraian?.toLowerCase().includes(q);
          if (!match) sp2d.splice(i, 1);
        }
      }

      const dataFiltered = sp2d.length;
      const pageSize = input.pageSize ?? dataFiltered;
      const firstRow = (page - 1) * pageSize + 1;
      const lastRow = (page - 1) * pageSize + Math.min(pageSize, dataFiltered - (page - 1) * pageSize);
      const pageCount = Math.ceil(dataFiltered / pageSize);

      const data = sp2d
        .slice((page - 1) * pageSize, page * pageSize)
        .map((item) => ({
          id: item.id,
          tglDokumen: item.tglDokumen,
          noDokumen: item.noDokumen,
          spmNoDokumen: item.spm?.noDokumen ?? null,
          jenis: item.spm?.spp?.lpjBelanja?.jenis ?? null,
          uraian: item.spm?.spp?.lpjBelanja?.uraian,
          jumlah: item.spm?.spp?.lpjBelanja?.belanja.reduce(
            (acc, curr) => acc + Number(curr.jumlah),
            0,
          ),
          noCek: item.noCek,
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
    const sp2dData = await ctx.db.query.sp2dTable.findFirst({
      where: eq(sp2dTable.id, input),
      with: {
        spm: {
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
        },
      },
    });

    if (!sp2dData) {
      return null;
    }

    const rekeningLevel6 = getRekening(ctx.session?.tahun).level6;

    // add kode and uraian to kodeRekening rab
    return {
      ...sp2dData,
      spm: {
        ...sp2dData.spm,
        spp: {
          ...sp2dData.spm?.spp,
          lpjBelanja: {
            ...sp2dData.spm?.spp?.lpjBelanja,
            belanja:
              sp2dData.spm?.spp?.lpjBelanja?.belanja.map((item) => ({
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
      },
    };
  }),

  create: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(sp2dSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sp2dTable).values(input);

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.object({ id: z.number() }).merge(sp2dSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(sp2dTable)
        .set(input)
        .where(eq(sp2dTable.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(sp2dTable).where(eq(sp2dTable.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getLatest: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.sp2dTable.findFirst({
      orderBy: [desc(sp2dTable.tglDokumen), desc(sp2dTable.noDokumen)],
    });
  }),
});
