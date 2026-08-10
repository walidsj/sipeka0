import { appRouter } from "./router";
import express from "express";
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from "@trpc/server/adapters/express";
import { getSession } from "./auth";
import { db } from "./db";
import { createServer } from "vite";

const app = express();
const port = process.env.PORT ?? 8089;

app.use(express.json());
app.use(express.static("dist"));

const vite = await createServer({
  appType: "spa",
  server: { middlewareMode: true, hmr: true },
});

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req }: CreateExpressContextOptions) => ({
      headers: req.headers,
      db,
      session: await getSession(req.headers.authorization ?? ""),
    }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
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

app.use(vite.middlewares);

app.use("/{*splat}", (_req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
