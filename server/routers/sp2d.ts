import { sp2dTable } from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { and, desc, eq, gte, like, lte, or } from "drizzle-orm";
import { z } from "zod";
import { rekeningLevel6 } from "@/data/rekening";
import { sp2dSchema } from "../schema/sp2d";

export const sp2dRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
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
          input.search
            ? or(like(sp2dTable.noDokumen, `%${input.search}%`))
            : undefined,
          input.startDate
            ? gte(sp2dTable.tglDokumen, input.startDate)
            : undefined,
          input.endDate ? lte(sp2dTable.tglDokumen, input.endDate) : undefined,
        ),
      });

      return sp2d.map((item) => ({
        id: item.id,
        tglDokumen: item.tglDokumen,
        noDokumen: item.noDokumen,
        uraian: item.spm?.spp?.lpjBelanja?.uraian,
        jumlah: item.spm?.spp?.lpjBelanja?.belanja.reduce(
          (acc, curr) => acc + Number(curr.jumlah),
          0,
        ),
        noCek: item.noCek,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
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
