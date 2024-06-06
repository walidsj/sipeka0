import { HashRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { cn } from './lib/utils'
import ReloadPrompt from './components/reload-pwa'
import { AnimatePresence, motion } from 'framer-motion'

export default function Router() {
    const importedRoutes: any = import.meta.glob(
        '@/app/routes/**/(layout|page|not-found).tsx'
    )

    const importedRoutesEager: any = import.meta.glob(
        '@/app/routes/**/(middleware).tsx',
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
        const type = key.match(/\/([^\/]+)\.tsx$/)

        const path = key
            .replace(/[^\/]+\.tsx$/, '') // remove file name
            .replace(/\.\.\/app\/routes/g, '') // remove ./routes
            .replace(/\/\(([^)]+)\)/g, '') // remove segment with /(segment)
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
        element: any
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
                                <React.Suspense>
                                    <motion.div
                                        key={route.key}
                                        initial={{ opacity: 0, y: 20 }}
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
                            <React.Suspense>
                                <motion.div
                                    key={route.key}
                                    initial={{ opacity: 0, y: 20 }}
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
                                    key={route.key}
                                    initial={{ opacity: 0, y: 20 }}
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

    function simulatePagesRouter(routes: RoutePagesType[]) {
        return routes.map((route) => {
            if (route.type === 'middleware') {
                if (route.children.length > 0) {
                    return (
                        <div
                            className={cn(
                                'm-5 border border-black p-5',
                                route.type === 'middleware' && 'bg-red-100'
                            )}
                        >
                            <span className="block font-bold">
                                {route.path}
                            </span>
                            <span className="text-xs text-gray-500">
                                {route.key}
                            </span>
                            <br />
                            <br />
                            <small className="text-gray-500">
                                Middleware: {route.middleware?.key}
                                <br />
                                Layout: {route.layout?.key}
                            </small>
                            {simulatePagesRouter(route.children)}
                        </div>
                    )
                }

                return (
                    <div
                        className={cn(
                            'm-5 border border-black p-5',
                            route.type === 'middleware' && 'bg-red-100'
                        )}
                    >
                        <span className="block font-bold">{route.path}</span>
                        <span className="text-xs text-gray-500">
                            {route.key}
                        </span>
                        <br />
                        <br />
                        <small className="text-gray-500">
                            Middleware: {route.middleware?.key}
                            <br />
                            Layout: {route.layout?.key}
                        </small>
                    </div>
                )
            }

            if (route.type === 'layout' || route.type === 'page') {
                if (route.children.length > 0) {
                    return (
                        <div
                            className={cn(
                                'm-5 border border-black p-5',
                                route.type === 'layout' && 'bg-yellow-100',
                                route.type === 'page' && 'bg-background'
                            )}
                        >
                            <span className="block font-bold">
                                {route.path}
                            </span>
                            <span className="text-xs text-gray-500">
                                {route.key}
                            </span>
                            <br />
                            <br />
                            <small className="text-gray-500">
                                Middleware: {route.middleware?.key}
                                <br />
                                Layout: {route.layout?.key}
                            </small>
                            {simulatePagesRouter(route.children)}
                        </div>
                    )
                }

                return (
                    <div
                        className={cn(
                            'm-5 border border-black p-5',
                            route.type === 'layout' && 'bg-yellow-100',
                            route.type === 'page' && 'bg-background'
                        )}
                    >
                        <span className="block font-bold">{route.path}</span>
                        <span className="text-xs text-gray-500">
                            {route.key}
                        </span>
                        <br />
                        <br />
                        <small className="text-gray-500">
                            Middleware: {route.middleware?.key}
                            <br />
                            Layout: {route.layout?.key}
                        </small>
                    </div>
                )
            }

            if (route.type === 'not-found') {
                return (
                    <div
                        className={cn(
                            'm-5 border border-black p-5',
                            route.type === 'not-found' && 'bg-gray-100'
                        )}
                    >
                        <span className="block font-bold">{route.path}</span>
                        <span className="text-xs text-gray-500">
                            {route.key}
                        </span>
                        <br />
                        <br />
                        <small className="text-gray-500">
                            Middleware: {route.middleware?.key}
                            <br />
                            Layout: {route.layout?.key}
                        </small>
                    </div>
                )
            }
        })
    }

    return (
        <AnimatePresence mode="wait">
            <HashRouter>
                <ReloadPrompt />
                <Routes>{renderRoutes(nest)}</Routes>
            </HashRouter>
        </AnimatePresence>
    )

    return <div>{simulatePagesRouter(nest)}</div>
}
