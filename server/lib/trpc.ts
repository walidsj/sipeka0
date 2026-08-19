import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { getDbForYear } from "#server/db";
import { eq } from "drizzle-orm";
import { user } from "#server/db/schema";
import { getSession } from "#server/lib/auth";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import SuperJSON from "superjson";
import { z } from "zod";

export const createTRPCContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const session = await getSession(req.headers.authorization ?? "");

  return {
    headers: req.headers,
    res,
    db: getDbForYear(session?.tahun ?? "2026"),
    session,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,

  errorFormatter({ shape, error }) {
    const zodError = error.cause instanceof ZodError ? error.cause : null;

    return {
      ...shape,

      message: zodError
        ? "Validation error: " +
          zodError.issues
            .map((e) => `${e.path.join(".").toUpperCase()}: ${e.message}`)
            .join(", ")
        : error.message,

      data: {
        ...shape.data,

        zodError: zodError ? z.flattenError(zodError) : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const userProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const existedUser = await ctx.db.query.user.findFirst({
    where: eq(user.id, Number(ctx.session.id)),
    with: {
      pegawai: {
        with: {
          pengelolaBlud: true,
        },
      },
    },
  });

  return next({
    ctx: {
      user: existedUser,
    },
  });
});

export const adminProcedure = userProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Anda tidak memiliki hak akses (unauthorized)",
    });
  }

  return next();
});

// jabatanList bisa berisi satu atau lebih dari item string array berikut: ["KUASA PENGGUNA ANGGARAN" | "PEJABAT PELAKSANA TEKNIS KEGIATAN" | "PEJABAT PEMBUAT KOMITMEN" | "BENDAHARA PENGELUARAN" | "BENDAHARA PENERIMAAN" | "PEJABAT PENATAUSAHAAN KEUANGAN" | "PENGURUS BARANG" | "PEJABAT PENGADAAN"]
type JabatanListType =
  | "KUASA PENGGUNA ANGGARAN"
  | "PEJABAT PELAKSANA TEKNIS KEGIATAN"
  | "PEJABAT PEMBUAT KOMITMEN"
  | "BENDAHARA PENGELUARAN"
  | "BENDAHARA PENERIMAAN"
  | "PEJABAT PENATAUSAHAAN KEUANGAN"
  | "PENGURUS BARANG"
  | "PEJABAT PENGADAAN";

export const pengelolaProcedure = (jabatanList: JabatanListType[]) =>
  userProcedure.use(async ({ ctx, next }) => {
    if (!ctx.user?.pegawai?.pengelolaBlud) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "Anda tidak memiliki hak akses Pengelola BLUD (illegal access)",
      });
    }

    if (!jabatanList) {
      return next({ ctx });
    }

    let hasAccess = false;

    if (ctx.user?.pegawai?.pengelolaBlud) {
      ctx.user.pegawai.pengelolaBlud.forEach((pengelola) => {
        if (pengelola.role && jabatanList.includes(pengelola.role)) {
          hasAccess = true;
        }
      });
    }

    if (hasAccess) {
      return next({ ctx });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Anda tidak memiliki salah satu hak akses ${jabatanList.join(", ")} (illegal access)`,
      });
    }
  });
