import { HashRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from '@/components/loading'

export default function Router() {
    const importedRoutes = import.meta.glob(
        '@/app/**/(layout|page|not-found).tsx'
    )

    const importedRoutesEager = import.meta.glob('@/app/**/(middleware).tsx', {
        eager: true,
    })

    type RouteType = {
        key: string
        path: string
        segments: string[]
        type: string
        element: React.ElementType
    }

    const routes = Object.keys({
        ...importedRoutes,
        ...importedRoutesEager,
    }).map((key) => {
        const type = key.match(/\/([^/]+)\.tsx$/)

        const path = key
            .replace(/[^/]+\.tsx$/, '') // remove file name
            .replace(/\.\.\/app/g, '') // remove ./app
            .replace(/\/\(([^)]+)\)/g, '') // remove segment with /(segment)
            .replace(/\[([^/]+)\]/g, ':$1')

        const segments = key
            .replace(/[^/]+\.tsx$/, '')
            .split('/')
            .filter(Boolean)

        return {
            key,
            path: path ?? '/',
            segments,
            type: type ? type[1] : '',
            element:
                importedRoutes[key] instanceof Function
                    ? // @ts-expect-error TS2349: This expression is not callable.
                      React.lazy(importedRoutes[key])
                    : // @ts-expect-error TS2349: This expression is not callable.
                      importedRoutesEager[key].default,
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
                if (objRoute.type === 'middleware') {
                    return (
                        objRoute.segments
                            .slice(0, -1)
                            .join('/')
                            .includes(route.segments.join('/')) &&
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

        return listOfLayouts[listOfLayouts.length - 1] ?? null
    }

    const orderedRoutes = routes.map((route) => {
        const layout = layoutResolver(route)
        const middleware = middlewareResolver(route)

        let parent: string | null = null

        if (layout && middleware) {
            if (layout.segments.length >= middleware.segments.length) {
                parent = layout.key
            } else {
                parent = middleware.key
            }
        } else {
            parent = layout ? layout.key : middleware ? middleware.key : null
        }

        return {
            key: route.key,
            path: route.path,
            type: route.type,
            element: route.element,
            parent,
            layout,
            middleware,
        }
    })

    interface RoutePagesType {
        key: string
        path: string
        type: string
        element: React.ElementType
        parent: string | null | undefined
        children: RoutePagesType[]
        layout?: RouteType
        middleware?: RouteType
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

    function renderRoutes(routes: RoutePagesType[]) {
        return routes.map((route) => {
            if (route.type === 'middleware') {
                if (route.children.length > 0) {
                    return (
                        <Route key={route.key} element={<route.element />}>
                            {renderRoutes(route.children)}
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
                                <React.Suspense
                                    fallback={
                                        route.type === 'page' ? (
                                            <Loading />
                                        ) : undefined
                                    }
                                >
                                    <motion.div
                                        className="w-full"
                                        key={route.key}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <route.element />
                                    </motion.div>
                                </React.Suspense>
                            }
                        >
                            {renderRoutes(route.children)}
                        </Route>
                    )
                }

                return (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={
                            <React.Suspense
                                fallback={
                                    route.type === 'page' ? (
                                        <Loading />
                                    ) : undefined
                                }
                            >
                                <motion.div
                                    className="w-full"
                                    key={route.key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <route.element />
                                </motion.div>
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
                                <motion.div
                                    className="w-full"
                                    key={route.key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <route.element />
                                </motion.div>
                            </React.Suspense>
                        }
                    />
                )
            }
        })
    }
    return (
        <AnimatePresence>
            <HashRouter>
                <Routes>{renderRoutes(nest)}</Routes>
            </HashRouter>
        </AnimatePresence>
    )
}
