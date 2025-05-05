import { Glob } from 'bun'

const glob = new Glob('**/{page,layout,middleware}.tsx')

const APP_FOLDER = 'src/app'

type RouteObj = {
    type: 'page' | 'layout' | 'middleware'
    segments: string[]
    filePath: string
    path: string
    parentFilePath?: string
    children?: RouteObj[]
}

function normalizePath(path: string): string {
    // Normalize the path to use forward slashes
    return path.replace(/\\/g, '/')
}

function convertFilePathToPath(path: string): string {
    // rules to convert file path to route
    path = '\\' + path
    // Convert the unix-style path to a route
    path = normalizePath(path)
    // 1. Remove the file.[ext] (e.g., page.tsx, layout.tsx) from the path
    path = path.replace(/(page|layout|middleware)\.tsx$/, '')
    // 2. Change [slug] to :slug
    path = path.replace(/\[(.+?)\]/g, ':$1')
    // 3. Remove (group) from the path
    path = path.replace(/\(.*?\)/g, '')
    // 4. Remove double slashes
    path = path.replace(/\/\//g, '/')
    // 5. Remove trailing slash only if it is not the root path
    if (path !== '/') {
        path = path.replace(/\/$/, '')
    }

    return path
}

function convertFilePathToSegments(path: string): string[] {
    path = path.replace(/(page|layout|middleware)\.tsx$/, '')

    return path.split('\\').filter((segment) => segment !== '')
}

function getParentFilePath(route: RouteObj, flatRoutes: RouteObj[]): string {
    const parents = flatRoutes.filter((parent) => {
        if (route.segments.join('/').startsWith(parent.segments.join('/')) && route.filePath !== parent.filePath) {
            if (route.type === 'layout') {
                return (
                    (parent.type === 'layout' && parent.segments.length < route.segments.length) ||
                    parent.type === 'middleware'
                )
            }
            if (route.type === 'middleware') {
                return (
                    (parent.type === 'middleware' && parent.segments.length < route.segments.length) ||
                    (parent.type === 'layout' && parent.segments.length < route.segments.length)
                )
            }
            if (route.type === 'page') {
                return parent.type === 'layout' || parent.type === 'middleware'
            }
        } else {
            return false
        }
    })

    const maxLength = Math.max(...parents.map((parent) => parent.segments.length))
    const parent = parents.find((p) => p.segments.length === maxLength)

    return parent?.filePath ?? '' // Return empty string if no layout found
}

async function getFlatRoutes(appFolder: string): Promise<RouteObj[]> {
    let scannedFilePaths: string[] = []

    for await (const file of glob.scan(appFolder)) {
        scannedFilePaths.push(file)
    }

    const allRoutes: RouteObj[] = []

    for (const filePath of scannedFilePaths) {
        const segments = convertFilePathToSegments(filePath)
        const path = convertFilePathToPath(filePath)

        const type = filePath.includes('layout') ? 'layout' : filePath.includes('middleware') ? 'middleware' : 'page'

        allRoutes.push({
            type,
            segments,
            filePath: normalizePath(APP_FOLDER + '/' + filePath),
            path,
        })
    }

    const allRoutesWithLayout = allRoutes.map((route) => ({
        ...route,
        parentFilePath: getParentFilePath(route, allRoutes),
    }))

    return allRoutesWithLayout
}

function buildRouteTree(flatRoutes: RouteObj[]): RouteObj[] {
    const routeTree: RouteObj[] = []
    const map: { [key: string]: RouteObj } = {}

    for (const item of flatRoutes) {
        map[item.filePath] = { ...item, children: [] }
    }

    for (const item of flatRoutes) {
        if (item.parentFilePath) {
            map[item.parentFilePath].children?.push(map[item.filePath])
        } else {
            routeTree.push(map[item.filePath])
        }
    }

    return routeTree
}

async function build() {
    const routes = await getFlatRoutes(APP_FOLDER)
    const routeTree = buildRouteTree(routes)

    const paths = [...new Set(routes.map((route) => route.path))]

    const transformer = (route: RouteObj): string => {
        const { path, filePath, children } = route

        return `{
      id: "${filePath}",
      path: "${path}",
      Component: React.lazy(() => import("${filePath}")),
      ${children ? `children: [${children.map(transformer).join(',')}]` : ''}
    }`
    }

    const output = `// routes.tsx - AUTO-GENERATED FILE
import {
  type DataRouteObject,
  useParams as _useParams,
  useNavigate as _useNavigate,
  Link as _Link,
  NavLink as _NavLink,
  Navigate as _Navigate,
  generatePath,
  type LinkProps as _LinkProps,
  type NavigateOptions as _NavigateOptions,
} from "react-router";
import React from "react";

export type Paths = ${paths.map((path) => `"${path}"`).join('|\n')};

export type Params = {
${routes
    .map((route) => {
        const params = route.path.match(/:(\w+)/g)
        if (!params) return null
        return `  "${route.path}": {${params.map((param) => `${param.slice(1)}: string`).join(', ')}}`
    })
    .filter(Boolean)
    .join(';\n')}
}

export const routes: DataRouteObject[] = [
${routeTree.map((route) => transformer(route)).join(',\n')}
];

// This is a workaround for the fact that react-router does not support dynamic imports in the routes array

// Link is a wrapper around react-router's Link component

export type To<Pathname = string> = {
  pathname: Pathname;
  search?: string;
  hash?: string;
};

type ComponentProps<
  Path extends string | To,
  Params extends Record<string, any>,
> = Path extends keyof Params
  ? { to: Path; params: Params[Path] }
  : Path extends { pathname: infer Pathname }
    ? Pathname extends keyof Params
      ? { to: To<Pathname>; params: Params[Pathname] }
      : { to: To<Pathname>; params?: never }
    : { to: Path; params?: never };

export type LinkProps<
  Path extends string | To,
  Params extends Record<string, any>,
> = Omit<_LinkProps, "to"> & ComponentProps<Path, Params>;

type LinkRef = React.ForwardedRef<HTMLAnchorElement>;

export const Link = React.forwardRef(
  <P extends Paths | To<Paths>>(
    { to, params, ...props }: LinkProps<P, Params>,
    ref: LinkRef,
  ) => {
    const path = generatePath(
      typeof to === "string" ? to : to.pathname,
      params || ({} as any),
    );
    return (
      <_Link
        ref={ref}
        {...props}
        to={
          typeof to === "string"
            ? path
            : { pathname: path, search: to.search, hash: to.hash }
        }
      />
    );
  },
);

// Navigate is a wrapper around react-router's Navigate component

export const Navigate =  <P extends Paths | To<Paths>>({ to, params, ...props }: LinkProps<P, Params>) => {
  const path = generatePath(typeof to === 'string' ? to : to.pathname, params || ({} as any))
  return (
    <_Navigate
      {...props}
      to={typeof to === 'string' ? path : { pathname: path, search: to.search, hash: to.hash }}
    />
  )
}

// useParams is a hook that returns the params of the current route

export const useParams = <P extends keyof Params>(path: P) =>
  _useParams<Params[typeof path]>() as Params[P];

// useNavigate is a hook that returns the navigate function of the current route


export type NavigateOptions<Path extends string | To | number, Params extends Record<string, any>> = Path extends number
  ? []
  : Path extends keyof Params
    ? [_NavigateOptions & { params: Params[Path] }]
    : Path extends { pathname: infer Pathname }
      ? Pathname extends keyof Params
        ? [_NavigateOptions & { params: Params[Pathname] }]
        : [_NavigateOptions & { params?: never }] | []
      : [_NavigateOptions & { params?: never }] | []

export const useNavigate = () => {
  const navigate = _useNavigate()

      return React.useCallback(
        <P extends Paths | To<Paths> | number>(to: P, ...[options]: NavigateOptions<P, Params>) => {
          if (typeof to === 'number') return navigate(to)
          const path = generatePath(typeof to === 'string' ? to : to.pathname, options?.params || ({} as any))
          return navigate(typeof to === 'string' ? path : { pathname: path, search: to.search, hash: to.hash }, options)
        },
        [navigate],
      )
}

`

    Bun.write('src/web/router.tsx', output)
}

build()
