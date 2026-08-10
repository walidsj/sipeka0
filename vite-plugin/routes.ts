import path from "node:path";
import { promises as fs } from "node:fs";
import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";

type RouteType = "page" | "layout" | "middleware" | "not-found";

type RouteObj = {
  type: RouteType;

  /**
   * Path relatif terhadap src/app
   *
   * dashboard/users/page.tsx
   */
  relativeFilePath: string;

  /**
   * Path file relatif terhadap root project.
   *
   * src/app/dashboard/users/page.tsx
   */
  filePath: string;

  /**
   * Import path relatif terhadap generated router.
   *
   * ../app/dashboard/users/page
   */
  importPath: string;

  /**
   * Segment filesystem.
   *
   * ["(dashboard)", "users", "[id]"]
   */
  segments: string[];

  /**
   * Segment URL.
   *
   * ["users", ":id"]
   */
  urlSegments: string[];

  /**
   * Full URL.
   *
   * /users/:id
   */
  path: string;

  /**
   * Parent route berdasarkan filesystem hierarchy.
   */
  parentFilePath?: string;

  /**
   * Child routes.
   */
  children: RouteObj[];
};

export type RoutesPluginOptions = {
  /**
   * Directory yang berisi filesystem routes.
   *
   * @default "src/app"
   */
  appDir?: string;

  /**
   * File hasil generate.
   *
   * @default "src/router.tsx"
   */
  output?: string;

  /**
   * Extension route yang didukung.
   *
   * @default [".tsx"]
   */
  extensions?: string[];
};

export default function routes(options: RoutesPluginOptions = {}): Plugin {
  let config: ResolvedConfig;
  let server: ViteDevServer | undefined;

  const appDir = options.appDir ?? "src/app";
  const output = options.output ?? "src/router.tsx";
  const extensions = options.extensions ?? [".tsx"];

  let generating = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  // ============================================================
  // Utils
  // ============================================================

  function resolvePath(file: string) {
    return path.resolve(config.root, file);
  }

  function normalizePath(value: string) {
    return value.replace(/\\/g, "/");
  }

  function arraysEqual(a: string[], b: string[]) {
    return (
      a.length === b.length && a.every((value, index) => value === b[index])
    );
  }

  // ============================================================
  // Route Type
  // ============================================================

  function getRouteType(filePath: string): RouteType {
    const fileName = normalizePath(filePath).split("/").at(-1);

    switch (fileName) {
      case "page.tsx":
        return "page";

      case "layout.tsx":
        return "layout";

      case "middleware.tsx":
        return "middleware";

      case "not-found.tsx":
        return "not-found";

      default:
        throw new Error(`Unknown route file: ${filePath}`);
    }
  }

  // ============================================================
  // Filesystem → Segments
  // ============================================================

  function convertFilePathToSegments(filePath: string): string[] {
    return normalizePath(filePath)
      .replace(/\/?(page|layout|middleware|not-found)\.tsx$/, "")
      .split("/")
      .filter(Boolean);
  }

  function isRouteGroup(segment: string) {
    return /^\(.+\)$/.test(segment);
  }

  function convertSegmentToUrlSegment(segment: string): string | null {
    /**
     * Route group
     *
     * (auth) -> null
     */
    if (isRouteGroup(segment)) {
      return null;
    }

    /**
     * Dynamic route
     *
     * [id] -> :id
     */
    const dynamicMatch = segment.match(/^\[([A-Za-z0-9_]+)\]$/);

    if (dynamicMatch) {
      return `:${dynamicMatch[1]}`;
    }

    /**
     * Unsupported dynamic route.
     */
    if (segment.startsWith("[") || segment.endsWith("]")) {
      throw new Error(
        `Unsupported dynamic route segment "${segment}". ` +
          `Currently only [param] is supported.`,
      );
    }

    return segment;
  }

  function convertSegmentsToUrlSegments(segments: string[]): string[] {
    return segments
      .map(convertSegmentToUrlSegment)
      .filter((segment): segment is string => segment !== null);
  }

  function convertSegmentsToPath(segments: string[]): string {
    if (segments.length === 0) {
      return "/";
    }

    return `/${segments.join("/")}`;
  }

  // ============================================================
  // Ancestor
  // ============================================================

  function isAncestorSegments(
    parentSegments: string[],
    childSegments: string[],
  ) {
    if (parentSegments.length > childSegments.length) {
      return false;
    }

    return parentSegments.every(
      (segment, index) => childSegments[index] === segment,
    );
  }

  // ============================================================
  // Import Path
  // ============================================================

  function createImportPath(filePath: string) {
    const outputFile = resolvePath(output);

    const outputDirectory = path.dirname(outputFile);

    let importPath = normalizePath(path.relative(outputDirectory, filePath));

    importPath = importPath.replace(/\.(tsx|ts|jsx|js)$/, "");

    if (!importPath.startsWith(".")) {
      importPath = `./${importPath}`;
    }

    return importPath;
  }

  // ============================================================
  // Scan Files
  // ============================================================

  async function scanFiles(directory: string): Promise<string[]> {
    const results: string[] = [];

    async function walk(currentDirectory: string) {
      const entries = await fs.readdir(currentDirectory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        const fullPath = path.join(currentDirectory, entry.name);

        if (entry.isDirectory()) {
          await walk(fullPath);
          continue;
        }

        if (!entry.isFile()) {
          continue;
        }

        const ext = path.extname(entry.name);

        if (!extensions.includes(ext)) {
          continue;
        }

        if (
          entry.name !== "page.tsx" &&
          entry.name !== "layout.tsx" &&
          entry.name !== "middleware.tsx" &&
          entry.name !== "not-found.tsx"
        ) {
          continue;
        }

        results.push(fullPath);
      }
    }

    try {
      await walk(directory);
    } catch (error: any) {
      if (error?.code === "ENOENT") {
        return [];
      }

      throw error;
    }

    return results.sort();
  }

  // ============================================================
  // Find Same Directory
  // ============================================================

  function findSameDirectoryMiddleware(route: RouteObj, routes: RouteObj[]) {
    return routes.find(
      (candidate) =>
        candidate.type === "middleware" &&
        candidate.filePath !== route.filePath &&
        arraysEqual(candidate.segments, route.segments),
    );
  }

  function findSameDirectoryLayout(route: RouteObj, routes: RouteObj[]) {
    return routes.find(
      (candidate) =>
        candidate.type === "layout" &&
        candidate.filePath !== route.filePath &&
        arraysEqual(candidate.segments, route.segments),
    );
  }

  // ============================================================
  // Find Nearest Wrapper
  // ============================================================

  function findNearestAncestorWrapper(route: RouteObj, routes: RouteObj[]) {
    const candidates = routes.filter((candidate) => {
      if (candidate.filePath === route.filePath) {
        return false;
      }

      if (candidate.type !== "layout" && candidate.type !== "middleware") {
        return false;
      }

      if (candidate.segments.length >= route.segments.length) {
        return false;
      }

      return isAncestorSegments(candidate.segments, route.segments);
    });

    if (candidates.length === 0) {
      return undefined;
    }

    const deepestLength = Math.max(
      ...candidates.map((candidate) => candidate.segments.length),
    );

    const deepestCandidates = candidates.filter(
      (candidate) => candidate.segments.length === deepestLength,
    );

    /**
     * Layout lebih dalam daripada
     * middleware pada directory yang sama.
     */
    return (
      deepestCandidates.find((candidate) => candidate.type === "layout") ??
      deepestCandidates.find((candidate) => candidate.type === "middleware")
    );
  }

  // ============================================================
  // Parent Route
  // ============================================================

  function getParentRoute(route: RouteObj, routes: RouteObj[]) {
    /**
     * Middleware hanya mencari
     * wrapper ancestor.
     */
    if (route.type === "middleware") {
      return findNearestAncestorWrapper(route, routes);
    }

    /**
     * Layout:
     *
     * middleware
     *   └── layout
     */
    if (route.type === "layout") {
      return (
        findSameDirectoryMiddleware(route, routes) ??
        findNearestAncestorWrapper(route, routes)
      );
    }

    /**
     * Page dan not-found:
     *
     * middleware
     *   └── layout
     *       ├── page
     *       └── not-found
     */
    if (route.type === "page" || route.type === "not-found") {
      return (
        findSameDirectoryLayout(route, routes) ??
        findSameDirectoryMiddleware(route, routes) ??
        findNearestAncestorWrapper(route, routes)
      );
    }

    return undefined;
  }

  // ============================================================
  // Flat Routes
  // ============================================================

  async function getFlatRoutes(appFolder: string): Promise<RouteObj[]> {
    const appRoot = resolvePath(appFolder);

    const absoluteFiles = await scanFiles(appRoot);

    const routes = absoluteFiles.map((absoluteFilePath) => {
      const relativeFilePath = normalizePath(
        path.relative(appRoot, absoluteFilePath),
      );

      const segments = convertFilePathToSegments(relativeFilePath);

      const urlSegments = convertSegmentsToUrlSegments(segments);

      return {
        type: getRouteType(relativeFilePath),

        relativeFilePath,

        filePath: normalizePath(path.relative(config.root, absoluteFilePath)),

        importPath: createImportPath(absoluteFilePath),

        segments,

        urlSegments,

        path: convertSegmentsToPath(urlSegments),

        children: [],
      };
    });

    /**
     * Tentukan parent setiap route.
     */
    for (const route of routes) {
      const parent = getParentRoute(route, routes);

      if (parent) {
        route.parentFilePath = parent.filePath;
      }
    }

    return routes;
  }

  // ============================================================
  // Build Route Tree
  // ============================================================

  function buildRouteTree(flatRoutes: RouteObj[]) {
    const routeMap = new Map<string, RouteObj>();

    for (const route of flatRoutes) {
      routeMap.set(route.filePath, {
        ...route,
        children: [],
      });
    }

    const routeTree: RouteObj[] = [];

    for (const route of flatRoutes) {
      const currentRoute = routeMap.get(route.filePath);

      if (!currentRoute) {
        continue;
      }

      if (!route.parentFilePath) {
        routeTree.push(currentRoute);

        continue;
      }

      const parent = routeMap.get(route.parentFilePath);

      if (!parent) {
        throw new Error(
          `Parent route "${route.parentFilePath}" not found ` +
            `for "${route.filePath}".`,
        );
      }

      parent.children.push(currentRoute);
    }

    return routeTree;
  }

  // ============================================================
  // Relative Route Path
  // ============================================================

  function getRelativeRoutePath(route: RouteObj, parent?: RouteObj) {
    if (!parent) {
      return route.urlSegments.join("/");
    }

    return route.urlSegments.slice(parent.urlSegments.length).join("/");
  }

  // ============================================================
  // Stringify
  // ============================================================

  function stringify(value: string) {
    return JSON.stringify(value);
  }

  // ============================================================
  // Route Transform
  // ============================================================

  function transformRoute(
    route: RouteObj,
    parent?: RouteObj,
    depth = 1,
  ): string {
    const indent = "  ".repeat(depth);

    const childIndent = "  ".repeat(depth + 1);

    const relativePath = getRelativeRoutePath(route, parent);

    const properties: string[] = [];

    /**
     * ID
     */
    properties.push(`${childIndent}id: ${stringify(route.filePath)}`);

    // ==========================================================
    // PAGE
    // ==========================================================

    if (route.type === "page") {
      /**
       * Page pada URL yang sama
       * dengan parent menjadi index route.
       */
      if (parent && relativePath === "") {
        properties.push(`${childIndent}index: true`);
      } else {
        properties.push(
          `${childIndent}path: ${stringify(relativePath || "/")}`,
        );
      }

      properties.push(
        `${childIndent}Component: React.lazy(() => import(${stringify(
          route.importPath,
        )}))`,
      );
    }

    // ==========================================================
    // LAYOUT / MIDDLEWARE
    // ==========================================================

    if (route.type === "layout" || route.type === "middleware") {
      /**
       * Wrapper normal.
       */
      if (relativePath !== "") {
        properties.push(`${childIndent}path: ${stringify(relativePath)}`);
      } else if (!parent) {
        properties.push(`${childIndent}path: "/"`);
      }

      properties.push(
        `${childIndent}Component: React.lazy(() => import(${stringify(
          route.importPath,
        )}))`,
      );
    }

    // ==========================================================
    // NOT FOUND
    // ==========================================================

    if (route.type === "not-found") {
      properties.push(`${childIndent}path: "*"`);

      properties.push(
        `${childIndent}Component: React.lazy(() => import(${stringify(
          route.importPath,
        )}))`,
      );
    }

    // ==========================================================
    // CHILDREN
    // ==========================================================

    if (route.children.length > 0) {
      const children = route.children
        .map((child) => transformRoute(child, route, depth + 1))
        .join(",\n");

      properties.push(
        `${childIndent}children: [\n` + `${children}\n` + `${childIndent}]`,
      );
    }

    return `${indent}{\n` + `${properties.join(",\n")}\n` + `${indent}}`;
  }

  // ============================================================
  // Duplicate Page Validation
  // ============================================================

  function validateDuplicatePages(routes: RouteObj[]) {
    const pages = routes.filter((route) => route.type === "page");

    const pathMap = new Map<string, RouteObj[]>();

    for (const page of pages) {
      const existing = pathMap.get(page.path) ?? [];

      existing.push(page);

      pathMap.set(page.path, existing);
    }

    const duplicates = [...pathMap.entries()].filter(
      ([, routes]) => routes.length > 1,
    );

    if (duplicates.length === 0) {
      return;
    }

    const description = duplicates
      .map(([routePath, routes]) =>
        [
          `Duplicate route "${routePath}":`,
          ...routes.map((route) => `  - ${route.filePath}`),
        ].join("\n"),
      )
      .join("\n\n");

    throw new Error(description);
  }

  // ============================================================
  // Duplicate Not Found Validation
  // ============================================================

  function validateDuplicateNotFound(routes: RouteObj[]) {
    const notFoundRoutes = routes.filter((route) => route.type === "not-found");

    const pathMap = new Map<string, RouteObj[]>();

    for (const route of notFoundRoutes) {
      const existing = pathMap.get(route.path) ?? [];

      existing.push(route);

      pathMap.set(route.path, existing);
    }

    const duplicates = [...pathMap.entries()].filter(
      ([, routes]) => routes.length > 1,
    );

    if (duplicates.length === 0) {
      return;
    }

    const description = duplicates
      .map(([routePath, routes]) =>
        [
          `Duplicate not-found route "${routePath}":`,
          ...routes.map((route) => `  - ${route.filePath}`),
        ].join("\n"),
      )
      .join("\n\n");

    throw new Error(description);
  }

  // ============================================================
  // Paths Type
  // ============================================================

  function generatePathsType(routes: RouteObj[]) {
    const paths = [
      ...new Set(
        routes
          .filter((route) => route.type === "page")
          .map((route) => route.path),
      ),
    ];

    if (paths.length === 0) {
      return "never";
    }

    return paths.map(stringify).join(" |\n  ");
  }

  // ============================================================
  // Params
  // ============================================================

  function extractParams(routePath: string) {
    return [...routePath.matchAll(/:([A-Za-z0-9_]+)/g)].map(
      (match) => match[1],
    );
  }

  function generateParamsType(routes: RouteObj[]) {
    const pages = routes.filter((route) => route.type === "page");

    const entries = new Map<string, string[]>();

    for (const page of pages) {
      const params = extractParams(page.path);

      if (params.length === 0) {
        continue;
      }

      entries.set(page.path, params);
    }

    if (entries.size === 0) {
      return "{}";
    }

    const properties = [...entries.entries()]
      .map(([routePath, params]) => {
        const paramsType = params
          .map((param) => `${stringify(param)}: string`)
          .join("; ");

        return `  ${stringify(routePath)}: ` + `{ ${paramsType} }`;
      })
      .join("\n");

    return `{\n${properties}\n}`;
  }

  // ============================================================
  // Not Found Type
  // ============================================================

  function generateNotFoundType(routes: RouteObj[]) {
    const notFoundRoutes = routes.filter((route) => route.type === "not-found");

    if (notFoundRoutes.length === 0) {
      return "never";
    }

    const paths = [...new Set(notFoundRoutes.map((route) => route.path))];

    return paths.map(stringify).join(" |\n  ");
  }

  // ============================================================
  // Generate
  // ============================================================

  async function generate() {
    if (generating) {
      return;
    }

    generating = true;

    try {
      const flatRoutes = await getFlatRoutes(appDir);

      validateDuplicatePages(flatRoutes);

      validateDuplicateNotFound(flatRoutes);

      const routeTree = buildRouteTree(flatRoutes);

      const pathsType = generatePathsType(flatRoutes);

      const paramsType = generateParamsType(flatRoutes);

      const notFoundType = generateNotFoundType(flatRoutes);

      const generatedRoutes = routeTree
        .map((route) => transformRoute(route))
        .join(",\n");

      const outputContent = `// ============================================================
// AUTO-GENERATED FILE
//
// DO NOT EDIT THIS FILE MANUALLY.
//
// Generated by vite-plugin-routes
//
// Source:
// ${appDir}
//
// ============================================================

import React from "react"

import {
  type DataRouteObject,
} from "react-router"

// ============================================================
// Paths
// ============================================================

export type Paths =
  ${pathsType}

// ============================================================
// Params
// ============================================================

export type Params =
  ${paramsType}

// ============================================================
// Not Found Paths
// ============================================================

export type NotFoundPaths =
  ${notFoundType}

// ============================================================
// Routes
// ============================================================

export const routes: DataRouteObject[] = [
${generatedRoutes}
]
`;

      const outputFile = resolvePath(output);

      await fs.mkdir(path.dirname(outputFile), {
        recursive: true,
      });

      await fs.writeFile(outputFile, outputContent, "utf8");

      config.logger.info(
        `Generated ${normalizePath(
          path.relative(config.root, outputFile),
        )} with ${flatRoutes.length} route files.`,
      );

      // ========================================================
      // HMR
      // ========================================================

      if (server) {
        const module = server.moduleGraph.getModuleById(outputFile);

        if (module) {
          server.moduleGraph.invalidateModule(module);

          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      }
    } finally {
      generating = false;
    }
  }

  // ============================================================
  // Schedule
  // ============================================================

  function scheduleGenerate() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      generate().catch((error) => {
        config.logger.error(
          error instanceof Error
            ? (error.stack ?? error.message)
            : String(error),
        );
      });
    }, 50);
  }

  // ============================================================
  // Vite Plugin
  // ============================================================

  return {
    name: "vite-plugin-routes",

    enforce: "pre",

    // ==========================================================
    // Config Resolved
    // ==========================================================

    async configResolved(resolvedConfig) {
      config = resolvedConfig;

      await generate();
    },

    // ==========================================================
    // Build
    // ==========================================================

    async buildStart() {
      await generate();
    },

    // ==========================================================
    // Dev Server
    // ==========================================================

    configureServer(devServer) {
      server = devServer;

      const appRoot = resolvePath(appDir);

      const watcher = devServer.watcher;

      const normalizedAppRoot = normalizePath(appRoot);

      const onFileChange = (file: string) => {
        const normalizedFile = normalizePath(file);

        if (
          normalizedFile === normalizedAppRoot ||
          normalizedFile.startsWith(`${normalizedAppRoot}/`)
        ) {
          scheduleGenerate();
        }
      };

      watcher.on("add", onFileChange);

      watcher.on("unlink", onFileChange);

      watcher.on("change", onFileChange);

      return () => {
        watcher.off("add", onFileChange);

        watcher.off("unlink", onFileChange);

        watcher.off("change", onFileChange);

        if (timer) {
          clearTimeout(timer);
        }

        server = undefined;
      };
    },
  };
}
