import {
  aktivitasRba,
  belanja,
  dba,
  lpjBelanjaTable,
  potonganBelanja,
  rab,
  rba,
} from "#server/db/schema";
import {
  createTRPCRouter,
  pengelolaProcedure,
  publicProcedure,
  userProcedure,
} from "#server/lib/trpc";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  isNotNull,
  like,
  lt,
  lte,
  or,
  sql,
  sum,
} from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { belanjaSchema, potonganBelanjaSchema } from "../schema/belanja.schema";
import { rekeningLevel6 } from "@/data/rekening";
import lodash from "lodash";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Base64 } from "js-base64";
import { tables } from "#server/db";
import fs from "fs";

export type JurnalJenis = "UP" | "BELANJA" | "LPJ_LS" | "LPJ_GU";

export type PotonganBelanjaType = {
  id?: string | number;
  tgl: string;
  noDokumen: string | null;
  kodeRekening: string | null;
  uraian: string | null;
  penerimaan: number;
  pengeluaran: number;
};

export type JurnalType = {
  id?: string | number;
  jenisJurnal: JurnalJenis;
  tgl: string;
  noDokumen: string | null;
  kodeRekening: string | null;
  uraian: string | null;
  penerimaan: number;
  pengeluaran: number;
  potonganBelanja?: PotonganBelanjaType[];
};

type JurnalGroup = {
  tgl: string;
  jenis: "UP" | "BELANJA_ANGGOTA_GU" | "LPJ_GU" | "BELANJA_NON_GU" | "LPJ_LS";
  order: number;
  data: JurnalType[];
};

function getTodayWita() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((item) => item.type === "year")?.value;
  const month = parts.find((item) => item.type === "month")?.value;
  const day = parts.find((item) => item.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

// ============================================================
// ORDER JURNAL
// ============================================================
//
// Prioritas hanya berlaku pada tanggal yang sama:
//
// 0 = Penerimaan UP
// 1 = Belanja anggota LPJ GU pada tanggal yang sama
// 2 = Pencairan GU
// 3 = Belanja nonanggota LPJ GU (siklus UP baru)
// 4 = LPJ LS (pencairan dan belanjanya selalu berpasangan)
//
// ============================================================

const JURNAL_ORDER = {
  UP: 0,
  BELANJA_ANGGOTA_GU: 1,
  LPJ_GU: 2,
  BELANJA_NON_GU: 3,
  LPJ_LS: 4,
} as const;

export const belanjaRouter = createTRPCRouter({
  getBelanjaBku: userProcedure
    .input(
      z
        .object({
          startDate: z.iso.date().optional(),
          endDate: z.iso.date().optional(),
        })
        .refine(
          (value) => {
            if (!value.startDate || !value.endDate) {
              return true;
            }

            return value.startDate <= value.endDate;
          },
          {
            message: "Tanggal akhir tidak boleh lebih kecil dari tanggal awal",
            path: ["endDate"],
          },
        ),
    )
    .query(async ({ ctx, input }) => {
      // ============================================================
      // DATE
      // ============================================================

      const today = getTodayWita();

      const startDate = input.startDate ?? `${today.slice(0, 7)}-01`;

      const endDate = input.endDate ?? today;

      // ============================================================
      // FILTER DATE
      // ============================================================

      const filterBelanjaDate = and(
        gte(belanja.tglDokumen, startDate),
        lte(belanja.tglDokumen, endDate),
      );

      const filterLpjDate = and(
        gte(lpjBelanjaTable.tglDokumen, startDate),
        lte(lpjBelanjaTable.tglDokumen, endDate),
      );

      // ============================================================
      // GROUP
      // ============================================================

      const jurnalGroups: JurnalGroup[] = [];

      // ============================================================
      // QUERY
      // ============================================================

      const [
        belanjaBeforeList,
        lpjBelanjaBeforeList,
        belanjaList,
        lpjBelanjaList,
      ] = await Promise.all([
        // ----------------------------------------------------------
        // BELANJA SEBELUM PERIODE
        // ----------------------------------------------------------

        ctx.db.query.belanja.findMany({
          where: lt(belanja.tglDokumen, startDate),

          with: {
            potonganBelanja: true,
          },
        }),

        // ----------------------------------------------------------
        // LPJ SEBELUM PERIODE
        // ----------------------------------------------------------

        ctx.db.query.lpjBelanjaTable.findMany({
          where: lt(lpjBelanjaTable.tglDokumen, startDate),

          with: {
            belanja: true,
          },
        }),

        // ----------------------------------------------------------
        // BELANJA PERIODE BERJALAN
        // ----------------------------------------------------------

        ctx.db.query.belanja.findMany({
          with: {
            rab: true,
            potonganBelanja: true,
          },

          where: filterBelanjaDate,

          orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
        }),

        // ----------------------------------------------------------
        // LPJ PERIODE BERJALAN
        // ----------------------------------------------------------

        ctx.db.query.lpjBelanjaTable.findMany({
          with: {
            // Penting:
            // ambil detail belanja langsung dari relation LPJ.
            //
            // Dengan begini LPJ tetap mengetahui seluruh belanjanya
            // walaupun tanggal belanja berada di luar periode.
            belanja: {
              with: {
                rab: true,
                potonganBelanja: true,
              },
            },

            spp: {
              with: {
                spm: {
                  with: {
                    sp2d: true,
                  },
                },
              },
            },
          },

          where: filterLpjDate,

          orderBy: [asc(lpjBelanjaTable.tglDokumen)],
        }),
      ]);

      // ============================================================
      // SALDO AWAL PENGELUARAN
      // ============================================================

      const saldoAwalPengeluaran = belanjaBeforeList.reduce((acc, item) => {
        return acc + Number(item.jumlah);
      }, 0);

      // ============================================================
      // SALDO AWAL POTONGAN
      // ============================================================

      const saldoAwalPotongan = belanjaBeforeList.reduce((acc, item) => {
        const potongan = item.potonganBelanja.reduce(
          (potonganAcc, potonganItem) => {
            return potonganAcc + Number(potonganItem.jumlah);
          },
          0,
        );

        return acc + potongan;
      }, 0);

      // ============================================================
      // SALDO AWAL PENERIMAAN
      // ============================================================

      let saldoAwalPenerimaan = lpjBelanjaBeforeList.reduce((acc, item) => {
        const penerimaan = item.belanja.reduce((belanjaAcc, belanjaItem) => {
          return belanjaAcc + Number(belanjaItem.jumlah);
        }, 0);

        return acc + penerimaan;
      }, 0);

      // ============================================================
      // UP
      // ============================================================

      const tanggalUp = "2026-01-23";

      const jumlahUp = 750_000_000;

      // ------------------------------------------------------------
      // UP SEBAGAI SALDO AWAL
      //
      // Hanya masuk saldo awal jika transaksi UP benar-benar
      // terjadi SEBELUM tanggal awal laporan.
      //
      // Kalau startDate === tanggalUp, maka UP merupakan transaksi
      // periode berjalan, bukan saldo awal.
      // ------------------------------------------------------------

      if (tanggalUp < startDate) {
        saldoAwalPenerimaan += jumlahUp;
      }

      // ============================================================
      // TYPE BELANJA
      // ============================================================

      type BelanjaRow = (typeof belanjaList)[number];

      // ============================================================
      // BELANJA YANG SUDAH DIPROSES
      // ============================================================

      const usedBelanjaIds = new Set<BelanjaRow["id"]>();

      // ============================================================
      // HELPER: CEK BELANJA DALAM PERIODE
      // ============================================================

      const isBelanjaInPeriod = (blj: { tglDokumen: string | null }) => {
        if (!blj.tglDokumen) {
          return false;
        }

        return blj.tglDokumen >= startDate && blj.tglDokumen <= endDate;
      };

      // ============================================================
      // HELPER: CREATE JURNAL BELANJA
      // ============================================================

      const createJurnalBelanja = (blj: BelanjaRow): JurnalType => {
        return {
          id: blj.id,

          jenisJurnal: "BELANJA",

          tgl: blj.tglDokumen ?? "",

          noDokumen: blj.noDokumen,

          kodeRekening: blj.rab?.kodeRekening ?? null,

          uraian: blj.uraian,

          penerimaan: 0,

          pengeluaran: Number(blj.jumlah),
        };
      };

      // ============================================================
      // PENERIMAAN UP PERIODE BERJALAN
      // ============================================================

      if (tanggalUp >= startDate && tanggalUp <= endDate) {
        jurnalGroups.push({
          tgl: tanggalUp,

          jenis: "UP",

          order: JURNAL_ORDER.UP,

          data: [
            {
              jenisJurnal: "UP",

              tgl: tanggalUp,

              noDokumen: "XAAB-873241",

              kodeRekening: null,

              uraian: "Penerimaan UP secara Transfer dari Rekening Kas BLUD",

              penerimaan: jumlahUp,

              pengeluaran: 0,
            },
          ],
        });
      }

      // ============================================================
      // LPJ LS
      // ============================================================
      //
      // Konsep:
      //
      // LPJ LS tetap dikelompokkan:
      //
      // PENERIMAAN LS
      //   ↓
      // BELANJA LS
      // BELANJA LS
      //
      // Tetapi hanya belanja yang memang berada di periode laporan
      // yang ditampilkan sebagai pengeluaran.
      //
      // Belanja sebelum startDate sudah masuk saldo awal pengeluaran,
      // sehingga tidak boleh ditampilkan lagi karena akan double.
      //
      // ============================================================

      const lpjBelanjaLs = lpjBelanjaList.filter((lpj) => lpj.jenis === "LS");

      for (const lpj of lpjBelanjaLs) {
        // ----------------------------------------------------------
        // BELANJA LS DALAM PERIODE
        // ----------------------------------------------------------

        const belanjaLs = lpj.belanja.filter((item) => isBelanjaInPeriod(item));

        const sortedBelanjaLs = lodash.sortBy(belanjaLs, [
          "tglDokumen",
          "noDokumen",
        ]);

        const group: JurnalType[] = [];

        // ----------------------------------------------------------
        // TOTAL LPJ LS
        //
        // Total penerimaan tetap berdasarkan seluruh belanja yang
        // berada pada LPJ tersebut.
        // ----------------------------------------------------------

        const jumlahLpj = lpj.belanja.reduce((acc, item) => {
          return acc + Number(item.jumlah);
        }, 0);

        // ----------------------------------------------------------
        // PENERIMAAN LPJ LS
        // ----------------------------------------------------------

        group.push({
          jenisJurnal: "LPJ_LS",

          tgl: lpj.tglDokumen ?? "",

          noDokumen: lpj.spp.spm.sp2d.noCek,

          kodeRekening: null,

          uraian: `Penerimaan LS secara Transfer untuk: ${lpj.uraian}`,

          penerimaan: jumlahLpj,

          pengeluaran: 0,
        });

        // ----------------------------------------------------------
        // BELANJA LS
        // ----------------------------------------------------------

        for (const blj of sortedBelanjaLs) {
          // Proteksi apabila belanja secara tidak sengaja
          // terhubung ke lebih dari satu LPJ.
          if (usedBelanjaIds.has(blj.id)) {
            continue;
          }

          usedBelanjaIds.add(blj.id);

          group.push(createJurnalBelanja(blj));
        }

        // ----------------------------------------------------------
        // GROUP LPJ LS
        // ----------------------------------------------------------

        jurnalGroups.push({
          tgl: lpj.tglDokumen ?? "",

          jenis: "LPJ_LS",

          order: JURNAL_ORDER.LPJ_LS,

          data: group,
        });
      }

      // ============================================================
      // LPJ GU
      // ============================================================
      //
      // GU berbeda dengan LS.
      //
      // Belanja GU tetap muncul pada tanggal belanja sebenarnya.
      //
      // Contoh:
      //
      // 01 Agustus -> Belanja       10 jt
      // 03 Agustus -> Belanja       20 jt
      // 15 Agustus -> Penerimaan GU 30 jt
      //
      // ============================================================

      const lpjBelanjaGu = lpjBelanjaList.filter((lpj) => lpj.jenis === "GU");

      for (const lpj of lpjBelanjaGu) {
        // ----------------------------------------------------------
        // BELANJA GU YANG BERADA DALAM PERIODE
        //
        // Belanja sebelum periode sudah terdapat di saldo awal.
        // ----------------------------------------------------------

        const belanjaGu = lpj.belanja.filter((item) => isBelanjaInPeriod(item));

        const sortedBelanjaGu = lodash.sortBy(belanjaGu, [
          "tglDokumen",
          "noDokumen",
        ]);

        // ----------------------------------------------------------
        // BELANJA GU
        // ----------------------------------------------------------

        for (const blj of sortedBelanjaGu) {
          if (usedBelanjaIds.has(blj.id)) {
            continue;
          }

          // Belanja hanya menjadi anggota LPJ GU yang posisinya sebelum
          // pencairan GU bila tanggalnya sama dengan tanggal pencairan.
          // Selebihnya (belanja UP pada tanggal lain) adalah awal siklus
          // UP berikutnya, sehingga harus berada setelah pencairan GU.
          if (blj.tglDokumen === lpj.tglDokumen) {
            usedBelanjaIds.add(blj.id);

            jurnalGroups.push({
              tgl: blj.tglDokumen ?? "",

              jenis: "BELANJA_ANGGOTA_GU",

              order: JURNAL_ORDER.BELANJA_ANGGOTA_GU,

              data: [createJurnalBelanja(blj)],
            });
          }
        }

        // ----------------------------------------------------------
        // TOTAL GU
        //
        // Penerimaan GU tetap sejumlah seluruh belanja yang
        // direimburse oleh LPJ tersebut.
        // ----------------------------------------------------------

        const jumlahLpj = lpj.belanja.reduce((acc, item) => {
          return acc + Number(item.jumlah);
        }, 0);

        // ----------------------------------------------------------
        // PENERIMAAN GU
        // ----------------------------------------------------------

        jurnalGroups.push({
          tgl: lpj.tglDokumen ?? "",

          jenis: "LPJ_GU",

          order: JURNAL_ORDER.LPJ_GU,

          data: [
            {
              jenisJurnal: "LPJ_GU",

              tgl: lpj.tglDokumen ?? "",

              noDokumen: lpj.spp.spm.sp2d.noCek,

              kodeRekening: null,

              uraian:
                "Penerimaan Ganti UP secara Transfer dari Rekening Kas BLUD",

              penerimaan: jumlahLpj,

              pengeluaran: 0,
            },
          ],
        });
      }

      // ============================================================
      // BELANJA BIASA
      // ============================================================
      //
      // Semua belanja periode berjalan yang belum diproses melalui
      // LS/GU akan dianggap sebagai belanja biasa.
      //
      // ============================================================

      const belanjaTanpaLpj = lodash.sortBy(
        belanjaList.filter((blj) => !usedBelanjaIds.has(blj.id)),
        ["tglDokumen", "noDokumen"],
      );

      for (const blj of belanjaTanpaLpj) {
        jurnalGroups.push({
          tgl: blj.tglDokumen ?? "",

          // Tidak menjadi anggota LPJ GU pada periode ini. Pada tanggal
          // pencairan GU yang sama, transaksi ini merupakan awal siklus
          // UP berikutnya sehingga wajib berada setelah pencairan GU.
          jenis: "BELANJA_NON_GU",

          order: JURNAL_ORDER.BELANJA_NON_GU,

          data: [createJurnalBelanja(blj)],
        });
      }

      // ============================================================
      // SORT GROUP
      // ============================================================
      //
      // PRIORITAS HANYA BERLAKU PADA TANGGAL YANG SAMA
      //
      // Tanggal berbeda:
      //
      // tanggal ASC
      //
      // Tanggal sama:
      //
      // 0 -> UP
      // 1 -> BELANJA anggota LPJ GU pada tanggal tersebut
      // 2 -> LPJ GU (menutup siklus UP lama)
      // 3 -> BELANJA nonanggota LPJ GU / UP baru
      // 4 -> LPJ LS (pencairan + belanja tetap satu pasangan)
      //
      // ============================================================

      jurnalGroups.sort((a, b) => {
        const dateA = a.tgl ?? "";
        const dateB = b.tgl ?? "";

        // ----------------------------------------------------------
        // TANGGAL
        // ----------------------------------------------------------

        if (dateA !== dateB) {
          return dateA < dateB ? -1 : 1;
        }

        // ----------------------------------------------------------
        // PRIORITAS
        // ----------------------------------------------------------

        if (a.order !== b.order) {
          return a.order - b.order;
        }

        // ----------------------------------------------------------
        // NO DOKUMEN
        //
        // Untuk LPJ LS:
        // data[0] = penerimaan LS
        // data[1] = belanja LS pertama
        //
        // Supaya urutan sesama LPJ LS mengikuti no dokumen
        // belanjanya, gunakan data[1] jika tersedia.
        // ----------------------------------------------------------

        const noA =
          a.jenis === "LPJ_LS"
            ? (a.data[1]?.noDokumen ?? a.data[0]?.noDokumen ?? "")
            : (a.data[0]?.noDokumen ?? "");

        const noB =
          b.jenis === "LPJ_LS"
            ? (b.data[1]?.noDokumen ?? b.data[0]?.noDokumen ?? "")
            : (b.data[0]?.noDokumen ?? "");

        return noA.localeCompare(noB, "id", {
          numeric: true,
          sensitivity: "base",
        });
      });

      // ============================================================
      // FLATTEN
      // ============================================================

      const jurnal = jurnalGroups.flatMap((group) => group.data);

      // ============================================================
      // TOTAL POTONGAN PERIODE BERJALAN
      // ============================================================

      const totalPotongan = belanjaList.reduce((acc, item) => {
        const jumlahPotongan = item.potonganBelanja.reduce(
          (potonganAcc, potongan) => {
            return potonganAcc + Number(potongan.jumlah);
          },
          0,
        );

        return acc + jumlahPotongan;
      }, 0);

      // ============================================================
      // RETURN
      // ============================================================

      return {
        data: jurnal,

        meta: {
          totalThisPeriode: {
            potongan: totalPotongan,
          },

          totalLastPeriode: {
            penerimaan: saldoAwalPenerimaan,

            pengeluaran: saldoAwalPengeluaran,

            potongan: saldoAwalPotongan,
          },
        },
      };
    }),

  getAll: userProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const pageSize = input.pageSize ?? 10;
      const search = input.search ?? "";
      const startDate = input.startDate;
      const endDate = input.endDate;

      const filterDate = and(
        startDate ? gte(belanja.tglDokumen, startDate) : undefined,
        endDate ? lte(belanja.tglDokumen, endDate) : undefined,
      );

      const belanjaList = await ctx.db.query.belanja.findMany({
        with: {
          rab: true,
          potonganBelanja: true,
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
        },
        where: search
          ? and(
              or(
                like(belanja.uraian, `%${search}%`),
                like(belanja.noDokumen, `%${search}%`),
              ),
              filterDate,
            )
          : filterDate,
        orderBy: [desc(belanja.tglDokumen), desc(belanja.noDokumen)],
        limit: pageSize ?? 10,
        offset: page ? (page - 1) * pageSize : 0,
      });

      const data = belanjaList.map((belanja) => ({
        ...belanja,
        rekening: rekeningLevel6.find(
          (rekening) => rekening.kode === belanja.rab?.kodeRekening,
        ),
      }));

      const total = await ctx.db
        .select({
          sum: sum(belanja.jumlah),
          count: count(belanja.jumlah),
        })
        .from(belanja);

      const filtered = await ctx.db
        .select({ count: count(belanja.jumlah) })
        .from(belanja)
        .where(
          search
            ? and(
                or(
                  like(belanja.uraian, `%${search}%`),
                  like(belanja.noDokumen, `%${search}%`),
                ),
                filterDate,
              )
            : filterDate,
        );

      const totalSum = total[0].sum;
      const dataFiltered = filtered[0].count;
      const dataTotal = total[0].count;
      const firstRow = (page ? (page - 1) * pageSize : 0) + 1;
      const lastRow = (page ? (page - 1) * pageSize : 0) + data.length;
      const pageCount = Math.ceil(dataFiltered / pageSize);

      return {
        data,
        totalSum,
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
    return await ctx.db.query.belanja.findFirst({
      where: eq(belanja.id, input),
      with: {
        potonganBelanja: true,
        rab: true,
        pegawai: {
          with: {
            bank: true,
          },
        },
        rekanan: {
          with: {
            bank: true,
          },
        },
      },
    });
  }),

  create: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(belanjaSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(belanja).values({
        ...input,
        jumlah: String(input.jumlah),
      });

      return { message: "Data berhasil ditambahkan" };
    }),

  updateById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.object({ id: z.number() }).merge(belanjaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(belanja)
        .set({
          ...input,
          jumlah: String(input.jumlah),
        })
        .where(eq(belanja.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deleteById: pengelolaProcedure(["BENDAHARA PENGELUARAN"])
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(belanja).where(eq(belanja.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getRealisasiAll: userProcedure.query(async ({ ctx }) => {
    const realisasi = await ctx.db
      .select({ sum: sum(belanja.jumlah) })
      .from(belanja);

    return realisasi[0].sum;
  }),

  getTarget: userProcedure.query(async ({ ctx }) => {
    const currentDba = await ctx.db.query.dba.findFirst({
      orderBy: desc(dba.tglDokumen),
      with: { rba: true },
    });

    if (!currentDba) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Belum ada penetapan DBA",
      });
    }

    const aktivitasBelanjabelanja = await ctx.db.query.aktivitasRba.findMany({
      where: and(
        eq(aktivitasRba.rbaId, Number(currentDba.rbaId)),
        eq(aktivitasRba.jenis, "BELANJA"),
      ),
      with: { rincianRbaBelanja: true },
    });

    return aktivitasBelanjabelanja.reduce((acc, item) => {
      return (
        acc +
        item.rincianRbaBelanja.reduce((acc, item) => {
          return acc + Number(item.harga) * Number(item.volume);
        }, 0)
      );
    }, 0);
  }),

  getLatest: userProcedure.query(async ({ ctx }) => {
    const lastData = await ctx.db.query.belanja.findFirst({
      orderBy: [desc(belanja.tglDokumen), desc(belanja.createdAt)],
    });

    return lastData;
  }),

  createPotonganById: userProcedure
    .input(potonganBelanjaSchema)
    .mutation(async ({ ctx, input }) => {
      const belanjaData = await ctx.db.query.belanja.findFirst({
        where: eq(belanja.id, input.belanjaId),
      });

      if (!belanjaData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data belanja tidak ditemukan",
        });
      }

      await ctx.db.insert(potonganBelanja).values({
        belanjaId: input.belanjaId,
        jenis: input.jenis,
        jumlah: String(input.jumlah),
        billing: input.billing,
        ntpn: input.ntpn,
      });

      return { message: "Data berhasil ditambahkan" };
    }),

  getPotonganByBelanjaId: userProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.potonganBelanja.findMany({
        where: eq(potonganBelanja.belanjaId, input),
      });
    }),

  getPotonganById: userProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.potonganBelanja.findFirst({
        where: eq(potonganBelanja.id, input),
      });
    }),

  updatePotonganById: userProcedure
    .input(z.object({ id: z.number() }).merge(potonganBelanjaSchema))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(potonganBelanja)
        .set({
          ...input,
          jumlah: String(input.jumlah),
        })
        .where(eq(potonganBelanja.id, input.id));

      return { message: "Data berhasil diupdate" };
    }),

  deletePotonganById: userProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(potonganBelanja).where(eq(potonganBelanja.id, input));

      return { message: "Data berhasil dihapus" };
    }),

  getUnclassifiedBelanjaByRba: userProcedure.query(async ({ ctx }) => {
    const latestDba = await ctx.db.query.dba.findFirst({
      orderBy: desc(dba.tglDokumen),
    });

    if (!latestDba) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "DBA belum tersedia",
      });
    }

    const rbaByDba = await ctx.db.query.rba.findFirst({
      where: eq(rba.id, latestDba.rbaId!),
    });

    const unclassified = await ctx.db.query.belanja.findMany({
      with: {
        rab: {
          with: {
            rincianRbaBelanja: {
              with: {
                aktivitas: true,
              },
            },
          },
        },
      },
      orderBy: [asc(belanja.tglDokumen), asc(belanja.createdAt)],
    });

    return unclassified
      .filter((item) => {
        return !item.rab?.rincianRbaBelanja.find((rincian) => {
          return rincian.aktivitas?.rbaId === rbaByDba?.id;
        });
      })
      .map((item) => ({
        ...item,
        rekening: rekeningLevel6.find(
          (rekening) => rekening.kode === item.rab?.kodeRekening,
        ),
      }));
  }),

  getAllBkPajak: userProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const startDate = input.startDate || format(new Date(), "yyyy-MM-01");
      const endDate = input.endDate || format(new Date(), "yyyy-MM-dd");

      const filterDate = and(
        startDate ? gte(belanja.tglDokumen, startDate) : undefined,
        endDate ? lte(belanja.tglDokumen, endDate) : undefined,
      );

      const belanjaList = await ctx.db.query.belanja.findMany({
        with: {
          rab: true,
          potonganBelanja: true,
          rekanan: true,
          pegawai: true,
        },
        where: filterDate,
        orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
      });

      return belanjaList;
    }),

  getBelanjaLra: userProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const latestDba = await ctx.db.query.dba.findFirst({
        orderBy: desc(dba.tglDokumen),
      });

      if (!latestDba) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "DBA belum tersedia",
        });
      }

      const rbaByDba = await ctx.db.query.rba.findFirst({
        where: eq(rba.id, latestDba.rbaId!),
        with: {
          aktivitas: {
            where: eq(aktivitasRba.jenis, "BELANJA"),
            with: {
              rincianRbaBelanja: {
                with: {
                  rab: true,
                },
              },
            },
          },
        },
      });

      if (!rbaByDba) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "RBA belum tersedia",
        });
      }

      /// buat array dengan format {kodeRekening: 'kode', jumlah: XXX}
      const anggaranBelanja = rbaByDba.aktivitas.map((aktivitas) => {
        return aktivitas.rincianRbaBelanja.map((rincian) => {
          return {
            kodeRekening: rincian.rab?.kodeRekening,
            jumlah: Number(rincian.harga) * Number(rincian.volume),
          };
        });
      });

      const anggaranBelanjaFlatten = anggaranBelanja.flat();

      const startDate = input.startDate || format(new Date(), "yyyy-01-01");
      const endDate = input.endDate || format(new Date(), "yyyy-MM-dd");

      const filterDate = and(
        startDate ? gte(belanja.tglDokumen, startDate) : undefined,
        endDate ? lte(belanja.tglDokumen, endDate) : undefined,
      );

      const rekapBelanja = ctx.db
        .select({
          rabId: belanja.rabId,
          jumlah: sql`SUM(${belanja.jumlah})`.as("jumlah"),
        })
        .from(belanja)
        .where(filterDate)
        .groupBy(belanja.rabId)
        .as("belanja");

      const rekapBelanjaSebelumnya = ctx.db
        .select({
          rabId: belanja.rabId,
          // Kolom agregat diberi alias berbeda dari `rekapBelanja` karena
          // referensi kolom derived table oleh Drizzle tidak di-prefix tabel,
          // sehingga nama kolom yang sama membuat query ambigu di MySQL.
          jumlahSebelumnya: sql`SUM(${belanja.jumlah})`.as("jumlahSebelumnya"),
        })
        .from(belanja)
        .where(startDate ? lt(belanja.tglDokumen, startDate) : undefined)
        .groupBy(belanja.rabId)
        .as("belanjaSebelumnya");

      const belanjaList = await ctx.db
        .select({
          id: rab.id,
          kodeRekening: rab.kodeRekening,
          jumlah: rekapBelanja.jumlah,
          jumlahSebelumnya: rekapBelanjaSebelumnya.jumlahSebelumnya,
        })
        .from(rab)
        .leftJoin(rekapBelanja, eq(rab.id, rekapBelanja.rabId))
        .leftJoin(
          rekapBelanjaSebelumnya,
          eq(rab.id, rekapBelanjaSebelumnya.rabId),
        )
        .where(
          or(
            isNotNull(rekapBelanja.jumlah),
            isNotNull(rekapBelanjaSebelumnya.jumlahSebelumnya),
          ),
        );

      const kodeRekeningBelanja = [
        ...new Set(belanjaList.map((item) => item.kodeRekening)),
      ];

      const kodeRekeningAnggaran = [
        ...new Set(anggaranBelanjaFlatten.map((item) => item.kodeRekening)),
      ];

      const rekeningLv6 = rekeningLevel6.filter((item) => {
        return (
          kodeRekeningBelanja.includes(item.kode) ||
          kodeRekeningAnggaran.includes(item.kode)
        );
      });

      const data = rekeningLv6.map((item) => {
        const belanja = belanjaList.filter(
          (belanja) => belanja.kodeRekening === item.kode,
        );

        return {
          kodeRekening: item.kode,
          uraian: item.uraian,
          anggaran: anggaranBelanjaFlatten
            .filter((anggaran) => {
              return anggaran.kodeRekening === item.kode;
            })
            .reduce((acc, item) => {
              return acc + item.jumlah;
            }, 0),
          jumlah: belanja.reduce((acc, item) => {
            return acc + Number(item.jumlah);
          }, 0),
          jumlahSebelumnya: belanja.reduce((acc, item) => {
            return acc + Number(item.jumlahSebelumnya);
          }, 0),
        };
      });

      return data;
    }),

  getBelanjaLrabyKodeRekening: userProcedure
    .input(
      z.object({
        kodeRekening: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const startDate = input.startDate || format(new Date(), "yyyy-01-01");
      const endDate = input.endDate || format(new Date(), "yyyy-MM-dd");

      const filterDate = and(
        startDate ? gte(belanja.tglDokumen, startDate) : undefined,
        endDate ? lte(belanja.tglDokumen, endDate) : undefined,
      );

      const rabList = await ctx.db.query.rab.findMany({
        where: eq(rab.kodeRekening, input.kodeRekening),
        with: {
          belanja: {
            where: filterDate,
            with: {
              pegawai: true,
              rekanan: true,
              rab: true,
              lpjBelanja: true,
            },
          },
        },
      });

      // belanja list dari rabList
      const belanjaList = rabList.map((rab) => rab.belanja);

      // flatten belanjaList
      const belanjaListFlatten = belanjaList.flat();

      return lodash.orderBy(
        belanjaListFlatten,
        ["tglDokumen", "noDokumen"],
        ["asc", "asc"],
      );
    }),

  getRealisasiHome: publicProcedure.query(async ({ ctx }) => {
    const realisasi = await ctx.db.query.belanja.findMany({
      with: {
        rab: true,
      },
    });

    const realisasiGroupByMonth = lodash.groupBy(realisasi, (item) => {
      return format(new Date(item.tglDokumen!), "yyyy-MM");
    });

    const data = Object.keys(realisasiGroupByMonth).map((key) => {
      const realisasi = realisasiGroupByMonth[key];

      return {
        name: key,
        "Belanja Pegawai": realisasi.reduce((acc, item) => {
          if (item.rab?.kodeRekening?.startsWith("5.1.01")) {
            return acc + Number(item.jumlah);
          }
          return acc + 0;
        }, 0),
        "Belanja Barang Jasa": realisasi.reduce((acc, item) => {
          if (item.rab?.kodeRekening?.startsWith("5.1.02")) {
            return acc + Number(item.jumlah);
          }
          return acc + 0;
        }, 0),
        "Belanja Modal": realisasi.reduce((acc, item) => {
          if (item.rab?.kodeRekening?.startsWith("5.2")) {
            return acc + Number(item.jumlah);
          }
          return acc + 0;
        }, 0),
      };
    });

    return data;
  }),

  getRealisasiKurvaS: userProcedure.query(async ({ ctx }) => {
    const realisasi = await ctx.db.query.belanja.findMany({
      with: {
        rab: true,
      },
    });

    const realisasiGroupByMonth = lodash.groupBy(realisasi, (item) => {
      return format(new Date(item.tglDokumen!), "yyyy-MM");
    });

    const monthly = Object.keys(realisasiGroupByMonth)
      .sort()
      .map((key) => {
        const items = realisasiGroupByMonth[key];
        const total = items.reduce(
          (acc, item) => acc + Number(item.jumlah),
          0,
        );

        return {
          name: format(new Date(`${key}-01`), "MMM yyyy", { locale: id }),
          realisasi: total,
        };
      });

    let cumulative = 0;

    return monthly.map((item) => {
      cumulative += item.realisasi;

      return {
        name: item.name,
        realisasi: cumulative,
      };
    });
  }),

  getRealisasiPerUnitKerja: userProcedure.query(async ({ ctx }) => {
    const realisasi = await ctx.db.query.belanja.findMany({
      with: {
        rab: {
          with: {
            unitKerja: true,
          },
        },
      },
    });

    const groupByUnitKerja = lodash.groupBy(realisasi, (item) => {
      return item.rab?.unitKerja?.nama ?? "Tanpa Unit Kerja";
    });

    return Object.keys(groupByUnitKerja).map((key) => {
      const total = groupByUnitKerja[key].reduce(
        (acc, item) => acc + Number(item.jumlah),
        0,
      );

      return {
        name: key,
        value: total,
      };
    });
  }),

  uploadFile: userProcedure
    .input(
      z.object({
        belanjaId: z.number(),
        filePdf: z.string().refine(Base64.isValid, { message: "Invalid File" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const pdfBuffer = Buffer.from(input.filePdf, "base64");

      const belanja = await ctx.db.query.belanja.findFirst({
        where: eq(tables.belanja.id, input.belanjaId),
      });

      if (!belanja) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data belanja tidak ditemukan",
        });
      }

      const fileName = `${belanja.noDokumen}.pdf`;

      fs.writeFileSync(`storage/files/belanja/${fileName}`, pdfBuffer);

      // check if file exist
      if (!fs.existsSync(`storage/files/belanja/${fileName}`)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "File gagal diupload",
        });
      }

      // update belanja
      await ctx.db
        .update(tables.belanja)
        .set({
          file: fileName,
        })
        .where(eq(tables.belanja.id, input.belanjaId));

      return { message: "File berhasil diupload" };
    }),
});
