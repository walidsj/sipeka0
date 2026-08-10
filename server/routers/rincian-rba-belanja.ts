import { rincianRbaBelanjaSchema } from "../schema/rincian-rba-belanja";
import { rekeningLevel6 } from "@/data/rekening";
import { rincianRbaBelanja } from "server/db/schema";
import { createTRPCRouter, userProcedure } from "#server/lib/trpc";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const rincianRbaBelanjaRouter = createTRPCRouter({
  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx }) => {
      const rincianRbaBelanjaList =
        await ctx.db.query.rincianRbaBelanja.findMany({
          with: {
            rab: true,
          },
        });

      return rincianRbaBelanjaList.map((rincianRbaBelanja) => {
        const kodeRekening = rekeningLevel6.find(
          (rekening) => rekening.kode === rincianRbaBelanja.rab?.kodeRekening,
        );

        return {
          ...rincianRbaBelanja,
          kodeRekening: kodeRekening?.kode,
          uraianRekening: kodeRekening?.uraian,
        };
      });
    }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.db.query.rincianRbaBelanja.findFirst({
      where: eq(rincianRbaBelanja.id, input),
    });
  }),

  getByAktivitasRbaId: userProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const rincianRbaBelanjaList =
        await ctx.db.query.rincianRbaBelanja.findMany({
          where: eq(rincianRbaBelanja.aktivitasRbaId, input),
          with: {
            rab: true,
          },
        });
      return rincianRbaBelanjaList.map((rincianRbaBelanja) => {
        const kodeRekening = rekeningLevel6.find(
          (rekening) => rekening.kode === rincianRbaBelanja.rab?.kodeRekening,
        );

        return {
          ...rincianRbaBelanja,
          rekening: kodeRekening,
        };
      });
    }),

  create: userProcedure
    .input(rincianRbaBelanjaSchema)
    .mutation(async ({ ctx, input }) => {
      if (
        (await ctx.db.query.rba.findFirst({
          where: eq(rincianRbaBelanja.id, input.aktivitasRbaId),
        })) === null
      ) {
        throw new TRPCError({
          message: "Aktivitas RBA Induk tidak ditemukan",
          code: "NOT_FOUND",
        });
      }

      await ctx.db.insert(rincianRbaBelanja).values({
        harga: String(input.harga),
        rabId: input.rabId,
        satuan: input.satuan,
        volume: String(input.volume),
        aktivitasRbaId: input.aktivitasRbaId,
      });

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: userProcedure
    .input(z.object({ id: z.number() }).merge(rincianRbaBelanjaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(rincianRbaBelanja)
        .set({
          harga: String(input.harga),
          rabId: input.rabId,
          satuan: input.satuan,
          volume: String(input.volume),
          aktivitasRbaId: input.aktivitasRbaId,
        })
        .where(eq(rincianRbaBelanja.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(rincianRbaBelanja)
        .where(eq(rincianRbaBelanja.id, input));

      return { message: "Data berhasil dihapus" };
    }),
});
