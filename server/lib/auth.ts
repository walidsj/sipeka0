import { env } from "#server/env";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { serialize } from "cookie";
import type { Response } from "express";
import { user } from "#server/db/schema";
import type { TahunAnggaran } from "#server/db";

const secret = env.JWT_SECRET_KEY ?? "secret";
const key = new TextEncoder().encode(secret);

export type Session = JWTPayload & {
  id: string;
  username?: string;
  role?: (typeof user.$inferSelect)["role"];
  tahun: TahunAnggaran;
};

export const ACCESS_TOKEN_TTL = "3m";
export const REFRESH_TOKEN_TTL = "30d";

export const REFRESH_COOKIE_NAME = "refreshToken";

function normalizeSession(payload: Session): Session {
  return {
    ...payload,
    tahun: payload.tahun === "2025" ? "2025" : "2026",
  } satisfies Session;
}

export async function signAccessToken(payload: Session) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(key);
}

export async function signRefreshToken(payload: Session) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(key);
}

async function decrypt(input: string): Promise<unknown> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown;
  } catch (error) {
    return null;
  }
}

export async function getSession(token: string) {
  if (!token) return null;
  const payload = (await decrypt(token)) as Session | null;

  if (!payload?.id) return null;

  return normalizeSession(payload);
}

export async function verifyRefreshToken(token: string) {
  if (!token) return null;
  const payload = (await decrypt(token)) as Session | null;

  if (!payload?.id) return null;

  return normalizeSession(payload);
}

export function setRefreshCookie(res: Response, token: string) {
  res.setHeader(
    "Set-Cookie",
    serialize(REFRESH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    }),
  );
}

export function clearRefreshCookie(res: Response) {
  res.setHeader(
    "Set-Cookie",
    serialize(REFRESH_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    }),
  );
}