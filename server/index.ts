import express from "express";
import { createServer as createViteServer } from "vite";
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from "@trpc/server/adapters/express";

import { appRouter } from "./router";
import { getSession } from "./auth";
import { db } from "./db";

const app = express();
const port = Number(process.env.PORT ?? 8089);
const isDev = process.env.NODE_ENV === "development";

app.use(express.json());

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,

    createContext: async ({ req }: CreateExpressContextOptions) => ({
      headers: req.headers,
      db,
      session: await getSession(req.headers.authorization ?? ""),
    }),

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

  app.use("/{*splat}", (req, res) => {
    res.sendFile("index.html", {
      root: "dist",
    });
  });
}

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
