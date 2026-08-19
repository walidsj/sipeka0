import { pegawai, user } from "#server/db/schema";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "#server/lib/trpc";
import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { parse } from "cookie";
import {
  clearRefreshCookie,
  type Session,
  REFRESH_COOKIE_NAME,
  setRefreshCookie,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "#server/lib/auth";
import { userSchema } from "#server/schema/user";
import fs from "fs";
import { getDbForYear } from "#server/db";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      userSchema
        .pick({ username: true })
        .merge(
          z.object({
            password: z.string().min(1),
            tahun: z.enum(["2025", "2026"]),
          }),
        ),
    )
    .mutation(async ({ ctx, input }) => {
      const selectedDb = getDbForYear(input.tahun);
      const existedUser = await selectedDb.query.user.findFirst({
        where: eq(user.username, input.username),
      });

      if (!existedUser) {
        throw new TRPCError({
          message: "Username tidak ditemukan",
          code: "UNAUTHORIZED",
        });
      }

      if (!bcryptjs.compareSync(input.password, existedUser.password!)) {
        throw new TRPCError({
          message: "Password salah",
          code: "UNAUTHORIZED",
        });
      }

      const sessionPayload: Session = {
        id: existedUser.id.toString(),
        username: existedUser.username ?? undefined,
        role: existedUser.role ?? undefined,
        tahun: input.tahun,
      };

      const token = await signAccessToken(sessionPayload);
      const refreshToken = await signRefreshToken(sessionPayload);

      setRefreshCookie(ctx.res, refreshToken);

      return { token, message: "Login berhasil" };
    }),

  refresh: publicProcedure.mutation(async ({ ctx }) => {
    const cookies = parse(ctx.headers.cookie ?? "");
    const refreshToken = cookies[REFRESH_COOKIE_NAME];

    if (!refreshToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Refresh token tidak ditemukan",
      });
    }

    const session = await verifyRefreshToken(refreshToken);

    if (!session) {
      clearRefreshCookie(ctx.res);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Refresh token tidak valid",
      });
    }

    const token = await signAccessToken(session);
    const newRefreshToken = await signRefreshToken(session);

    setRefreshCookie(ctx.res, newRefreshToken);

    return { token };
  }),

  register: publicProcedure
    .input(
      userSchema.omit({ role: true }).merge(
        z.object({
          password: z.string().min(5),
          token: z.string().length(8),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.token !== "12345678") {
        throw new TRPCError({
          message: "TokenID salah",
          code: "UNAUTHORIZED",
        });
      }

      const existedUser = await ctx.db.query.user.findFirst({
        where: eq(user.username, input.username),
      });

      if (existedUser) {
        throw new TRPCError({
          message: "Username telah didaftarkan, coba username lain",
          code: "UNAUTHORIZED",
        });
      }

      await ctx.db.insert(user).values({
        nama: input.nama,
        username: input.username,
        password: bcryptjs.hashSync(input.password, 10),
        instansi: input.instansi,
        role: "USER",
      });

      return { message: "User berhasil didaftarkan" };
    }),

  getProfile: userProcedure.query(async ({ ctx }) => {
    const existedUser = ctx.user;

    if (!existedUser) {
      throw new TRPCError({
        message: "User tidak ditemukan",
        code: "UNAUTHORIZED",
      });
    }

    return {
      ...existedUser,
      password: undefined,
      tahun: ctx.session?.tahun ?? "2026",
    };
  }),

  updateProfile: userProcedure
    .input(userSchema.pick({ nama: true, instansi: true, image: true }))
    .mutation(async ({ ctx, input }) => {
      const base64Image = input.image?.split(",")[1];
      const imageExtention = input.image?.split(";")[0].split("/")[1];
      const fileName = `${ctx.user?.id}_${Date.now()}.${imageExtention}`;

      if (base64Image && imageExtention) {
        if (ctx.user?.image) {
          fs.unlinkSync(`storage/files/user-image/${ctx.user?.image}`);
        }

        fs.writeFileSync(
          `storage/files/user-image/${fileName}`,
          base64Image,
          "base64",
        );
      }

      await ctx.db
        .update(user)
        .set({
          nama: input.nama,
          instansi: input.instansi,
          image: base64Image && imageExtention ? fileName : undefined,
        })
        .where(eq(user.id, ctx.user?.id ?? 0));

      return { message: "Profile berhasil diupdate" };
    }),

  updatePassword: userProcedure
    .input(
      z.object({
        password: z.string().min(1),
        newPassword: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existedUser = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.user?.id ?? 0),
      });

      if (!existedUser) {
        throw new TRPCError({
          message: "User tidak ditemukan",
          code: "UNAUTHORIZED",
        });
      }

      if (!bcryptjs.compareSync(input.password, existedUser.password!)) {
        throw new TRPCError({
          message: "Password lama salah",
          code: "UNAUTHORIZED",
        });
      }

      await ctx.db
        .update(user)
        .set({ password: bcryptjs.hashSync(input.newPassword, 10) })
        .where(eq(user.id, ctx.user?.id ?? 0));

      return { message: "Password berhasil diupdate" };
    }),

  getAll: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findMany({
      columns: {
        id: true,
        nama: true,
        username: true,
        instansi: true,
        role: true,
        pegawaiId: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        pegawai: true,
      },
      orderBy: [asc(user.nama)],
    });
  }),

  getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return (await ctx.db.query.user.findFirst({
      where: eq(user.id, input),
      columns: {
        id: true,
        nama: true,
        username: true,
        instansi: true,
        role: true,
        pegawaiId: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        pegawai: true,
      },
    })) as Omit<typeof user.$inferSelect, "password"> & {
      pegawai?: typeof pegawai.$inferSelect;
    };
  }),

  create: adminProcedure
    .input(userSchema.merge(z.object({ password: z.string().min(5) })))
    .mutation(async ({ ctx, input }) => {
      const existedUser = await ctx.db.query.user.findFirst({
        where: eq(user.username, input.username),
      });

      if (existedUser) {
        throw new TRPCError({
          message: "Username telah didaftarkan, coba username lain",
          code: "UNAUTHORIZED",
        });
      }

      await ctx.db.insert(user).values({
        ...input,
        password: bcryptjs.hashSync(input.password, 10),
      });

      return { message: "User berhasil ditambahkan" };
    }),

  updateById: adminProcedure
    .input(
      userSchema
        .pick({
          nama: true,
          instansi: true,
          role: true,
          pegawaiId: true,
          username: true,
        })
        .merge(
          z.object({
            id: z.number(),
            password: z.string().min(5).or(z.string().nullish()),
          }),
        ),
    )
    .mutation(async ({ ctx, input }) => {
      const { password, ...rest } = input;

      await ctx.db
        .update(user)
        .set({
          password: password ? bcryptjs.hashSync(password, 10) : undefined,
          ...rest,
        })
        .where(eq(user.id, input.id));

      return { message: "User berhasil diupdate" };
    }),

  deleteById: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(user).where(eq(user.id, input));

      return { message: "User berhasil dihapus" };
    }),
});
