import { env } from "#server/env";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
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

export async function encrypt(payload: unknown) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}

export async function decrypt(input: string): Promise<unknown> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSession(token: string) {
  if (!token) return null;
  const payload = (await decrypt(token)) as Session | null;

  if (!payload?.id) return null;

  return {
    ...payload,
    tahun: payload.tahun === "2025" ? "2025" : "2026",
  } satisfies Session;
}
