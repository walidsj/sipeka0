import { HashRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

const importedRoutes: any = import.meta.glob(
    '@/app/routes/**/(_layout|_page|_not-found).tsx'
)

const importedRoutesEager: any = import.meta.glob(
    '@/app/routes/**/(_middleware).tsx',
    { eager: true }
)

type RouteType = {
    key: string
    path: string
    segments: string[]
    type: string
    element: any
}

const routes: RouteType[] = Object.keys({
    ...importedRoutes,
    ...importedRoutesEager,
}).map((key) => {
    const type = key.match(/\/\_([^\/]+)\.tsx$/)

    const path = key
        .replace(/[^\/]+\.tsx$/, '') // remove file name
        .replace(/\.\.\/app\/routes/g, '') // remove ./routes
        .replace(/\/\(.*\)/g, '') // remove (segment)
        .replace(/\$([^\/]+)/g, ':$1') // replace $segment with :segment

    const segments = key
        .replace(/[^\/]+\.tsx$/, '')
        .split('/')
        .filter(Boolean)

    return {
        key,
        path: path ?? '/',
        segments,
        type: type ? type[1] : '',
        element:
            importedRoutes[key] instanceof Function
                ? React.lazy(importedRoutes[key] as any)
                : (importedRoutesEager[key].default as any),
    }
})

function middlewareResolver(objRoute: RouteType) {
    const listOfMiddlewares = routes
        .filter((route: RouteType) => {
            return route.type === 'middleware'
        })
        .filter((route: RouteType) => {
            return (
                objRoute.segments
                    .join('/')
                    .includes(route.segments.join('/')) &&
                objRoute.key !== route.key
            )
        })
        .sort((a, b) => {
            return a.segments.length - b.segments.length
        })
    return listOfMiddlewares[listOfMiddlewares.length - 1] ?? null
}

function layoutResolver(objRoute: RouteType) {
    const listOfLayouts = routes
        .filter((route: RouteType) => {
            return route.type === 'layout'
        })
        .filter((route: RouteType) => {
            if (route.type === 'middleware') {
                return (
                    objRoute.segments
                        .join('/')
                        .includes(route.segments.join('/')) &&
                    objRoute.segments.join('/') !== route.segments.join('/') &&
                    objRoute.key !== route.key
                )
            }
            return (
                objRoute.segments
                    .join('/')
                    .includes(route.segments.join('/')) &&
                objRoute.key !== route.key
            )
        })
        .sort((a, b) => {
            return a.segments.length - b.segments.length
        })

    if (objRoute.type === 'middleware') {
        if (listOfLayouts.length > 1) {
            return listOfLayouts[listOfLayouts.length - 2] ?? null
        }
    }

    return listOfLayouts[listOfLayouts.length - 1] ?? null
}

const orderedRoutes = routes.map((route) => {
    const layout = layoutResolver(route)
    const middleware = middlewareResolver(route)

    let parent: string | null = null

    if (route.type === 'page') {
        if (layout && middleware) {
            if (layout.segments.length >= middleware.segments.length) {
                parent = layout.key
            } else {
                parent = middleware.key
            }
        } else {
            parent = layout ? layout.key : middleware ? middleware.key : null
        }
    } else {
        if (route.type === 'layout') {
            if (layout && middleware) {
                if (layout.segments.length == middleware.segments.length) {
                    parent = layout.key
                } else {
                    parent = middleware
                        ? middleware.key
                        : layout
                        ? layout.key
                        : null
                }
            } else {
                parent = middleware
                    ? middleware.key
                    : layout
                    ? layout.key
                    : null
            }
        } else {
            parent = middleware ? middleware.key : layout ? layout.key : null
        }
    }

    return {
        key: route.key,
        path: route.path,
        type: route.type,
        element: route.element,
        parent,
        // layout,
        // middleware,
    }
})

interface RoutePagesType {
    key: string
    path: string
    type: string
    element: any
    parent: string | null | undefined
    children: RoutePagesType[]
}

function nestRoutes(data: typeof orderedRoutes) {
    const map: { [key: string]: RoutePagesType } = {}

    for (const item of data) {
        map[item.key] = { ...item, children: [] }
    }

    const result: RoutePagesType[] = []

    for (const item of data) {
        if (item.parent) {
            map[item.parent].children.push({
                ...map[item.key],
                parent: undefined,
            })
        } else {
            result.push(map[item.key])
        }
    }

    return result
}

const nest = nestRoutes(orderedRoutes)

function renderPagesRouter(routes: RoutePagesType[]) {
    return routes.map((route) => {
        if (route.type === 'middleware') {
            if (route.children.length > 0) {
                return (
                    <Route key={route.key} element={<route.element />}>
                        {renderPagesRouter(route.children)}
                    </Route>
                )
            }

            return <Route key={route.key} element={<route.element />} />
        }

        if (route.type === 'layout' || route.type === 'page') {
            if (route.children.length > 0) {
                return (
                    <Route
                        key={route.key}
                        element={
                            <React.Suspense>
                                <route.element />
                            </React.Suspense>
                        }
                    >
                        {renderPagesRouter(route.children)}
                    </Route>
                )
            }

            return (
                <Route
                    key={route.key}
                    path={route.path}
                    element={
                        <React.Suspense>
                            <route.element />
                        </React.Suspense>
                    }
                />
            )
        }

        if (route.type === 'not-found') {
            return (
                <Route
                    key={route.key}
                    path="*"
                    element={
                        <React.Suspense>
                            <route.element />
                        </React.Suspense>
                    }
                />
            )
        }
    })
}

export default function Router() {
    // return (
    //     <code>
    //         <pre>{JSON.stringify(nest, null, 3)}</pre>
    //     </code>
    // )

    return (
        <HashRouter>
            <Routes>{renderPagesRouter(nest)}</Routes>
        </HashRouter>
    )
}
