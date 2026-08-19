import { Rekening, getRekening } from "@/data/rekening";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { z } from "zod";

export const kodeRekeningRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        level: z.enum(["1", "2", "3", "4", "5", "6"]),
        kode: z.string().optional(),
        searchKode: z.string().optional(),
        search: z.string().optional(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const pageSize = input.pageSize ?? 10;

      const rekening = getRekening(ctx.session?.tahun);

      const levelMap: Record<string, Rekening> = {
        "1": rekening.level1,
        "2": rekening.level2,
        "3": rekening.level3,
        "4": rekening.level4,
        "5": rekening.level5,
        "6": rekening.level6,
      };

      const levelData = levelMap[input.level];

      let data: Rekening = [];
      let dataTotal: number = 0;

      dataTotal = levelData.length;
      data = levelData.filter((item) => {
          if (input.search) {
            if (input.searchKode) {
              return (
                (item.uraian
                  .toLowerCase()
                  .includes(input.search.toLowerCase()) ||
                  item.kode.startsWith(input.search.toLowerCase())) &&
                item.kode.startsWith(input.searchKode.toLowerCase())
              );
            }

            return (
              item.uraian.toLowerCase().includes(input.search.toLowerCase()) ||
              item.kode.startsWith(input.search.toLowerCase())
            );
          }

          if (input.searchKode) {
            return item.kode.startsWith(input.searchKode.toLowerCase());
          }

          return true;
        });

      const dataFiltered = data.length;

      if (input.page && input.pageSize) {
        const start = (input.page - 1) * input.pageSize;
        const end = start + input.pageSize;

        data = data?.slice(start, end);
      }

      const firstRow = (page ? (page - 1) * pageSize : 0) + 1;
      const lastRow = (page ? (page - 1) * pageSize : 0) + data.length;
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

  getByKode: userProcedure
    .input(
      z.object({
        level: z.enum(["1", "2", "3", "4", "5", "6"]),
        kode: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rekening = getRekening(ctx.session?.tahun);

      const levelMap: Record<string, Rekening> = {
        "1": rekening.level1,
        "2": rekening.level2,
        "3": rekening.level3,
        "4": rekening.level4,
        "5": rekening.level5,
        "6": rekening.level6,
      };

      const data = levelMap[input.level]?.find(
        (item) => item.kode === input.kode,
      );

      return data;
    }),
});
