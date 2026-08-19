export function getTokenCookie(): string {
  if (typeof document === "undefined") {
    return "";
  }

  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);

  return match ? decodeURIComponent(match[1]) : "";
}
