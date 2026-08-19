import express from "express";
import { createServer as createViteServer } from "vite";
import {
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import { parse } from "cookie";

import { appRouter } from "./router";
import { createTRPCContext } from "./lib/trpc";
import {
  clearRefreshCookie,
  REFRESH_COOKIE_NAME,
  setRefreshCookie,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./lib/auth";

const app = express();
const port = Number(process.env.PORT ?? 8089);
const isDev = process.env.NODE_ENV === "development";

app.use(express.json());

app.post("/api/auth/refresh", async (req, res) => {
  const cookies = parse(req.headers.cookie ?? "");
  const refreshToken = cookies[REFRESH_COOKIE_NAME];

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token tidak ditemukan" });
    return;
  }

  const session = await verifyRefreshToken(refreshToken);

  if (!session) {
    clearRefreshCookie(res);
    res.status(401).json({ message: "Refresh token tidak valid" });
    return;
  }

  const token = await signAccessToken(session);
  const newRefreshToken = await signRefreshToken(session);

  setRefreshCookie(res, newRefreshToken);

  res.json({ token });
});

app.post("/api/auth/logout", (_req, res) => {
  clearRefreshCookie(res);
  res.json({ message: "Logout berhasil" });
});

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,

    createContext: createTRPCContext,

    onError: isDev
      ? ({ path, error }) => {
          console.error(
            `tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
  }),
);

app.use("/api/storage/files/belanja/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: "storage/files/belanja",
  });
});

app.use("/api/storage/files/user-image/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: "storage/files/user-image",
  });
});

if (isDev) {
  // =========================
  // DEVELOPMENT
  // =========================

  const vite = await createViteServer({
    appType: "spa",
    server: {
      middlewareMode: true,
    },
  });

  app.use(vite.middlewares);
} else {
  // =========================
  // PRODUCTION
  // =========================

  app.use(
    express.static("dist", {
      index: false,
    }),
  );

  app.use("/{*splat}", (_req, res) => {
    res.sendFile("index.html", {
      root: "dist",
    });
  });
}

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
