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
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "same-origin",
        });

        if (!res.ok) {
          return null;
        }

        const data = (await res.json()) as { token?: string };

        if (data?.token) {
          writeToken(data.token);
          return data.token;
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