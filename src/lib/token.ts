import { getTRPCClient } from "@/trpc/client";

export function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : "";
}

export function writeToken(token: string) {
  document.cookie = `token=${encodeURIComponent(token)}; path=/; sameSite=strict; max-age=${30 * 24 * 60 * 60}`;
}

let refreshing: Promise<string | null> | null = null;

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshing) {
    refreshing = (async () => {
      const client = getTRPCClient();

      if (!client) {
        return null;
      }

      try {
        const result = await client.user.refresh.mutate();

        if (result?.token) {
          writeToken(result.token);
          return result.token;
        }

        return null;
      } catch {
        return null;
      } finally {
        refreshing = null;
      }
    })();
  }

  return refreshing;
}