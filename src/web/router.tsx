import {
    createBrowserRouter,
    type RouteObject,
    RouterProvider,
} from 'react-router-dom'
import React from 'react'
import { motion } from 'framer-motion'
import Loading from '@/components/loading'
// import Maintenance from '@/app/maintenance'

const importedRoutes = import.meta.glob('@/app/**/(page).tsx')

const importedRoutesEager = import.meta.glob(
    '@/app/**/(layout|not-found|middleware).tsx',
    { eager: true }
)

type RouteType = {
    key: string
    path: string
    segments: string[]
    type: string
    element: React.ElementType
}

const routesList = Object.keys({
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
        path: path || '/',
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
    const listOfMiddlewares = routesList
        .filter((route) => route.type === 'middleware')
        .filter(
            (route) =>
                objRoute.segments
                    .join('/')
                    .includes(route.segments.join('/')) &&
                objRoute.key !== route.key
        )
        .sort((a, b) => a.segments.length - b.segments.length)
    return listOfMiddlewares[listOfMiddlewares.length - 1] || null
}

function layoutResolver(objRoute: RouteType) {
    const listOfLayouts = routesList
        .filter((route) => route.type === 'layout')
        .filter((route) => {
            if (objRoute.type === 'middleware')
                return (
                    objRoute.segments
                        .slice(0, -1)
                        .join('/')
                        .includes(route.segments.join('/')) &&
                    objRoute.key !== route.key
                )

            return (
                objRoute.segments
                    .join('/')
                    .includes(route.segments.join('/')) &&
                objRoute.key !== route.key
            )
        })
        .sort((a, b) => a.segments.length - b.segments.length)
    return listOfLayouts[listOfLayouts.length - 1] || null
}

const orderedRoutes = routesList.map((route) => {
    const layout = layoutResolver(route)
    const middleware = middlewareResolver(route)

    let parentKey: string | null = null

    if (layout && middleware) {
        if (layout.segments.length >= middleware.segments.length) {
            parentKey = layout.key
        } else {
            parentKey = middleware.key
        }
    } else {
        parentKey = layout ? layout.key : middleware ? middleware.key : null
    }

    return {
        key: route.key,
        path: route.path,
        type: route.type,
        element: route.element,
        parentKey,
    }
})

interface RoutePagesType {
    key: string
    path: string
    type: string
    element: React.ElementType
    parentKey: string | null | undefined
    children: RoutePagesType[]
}

function nestRoutes(data: typeof orderedRoutes) {
    const map: { [key: string]: RoutePagesType } = {}

    for (const item of data) {
        map[item.key] = { ...item, children: [] }
    }

    const result: RoutePagesType[] = []

    for (const item of data) {
        if (item.parentKey) {
            map[item.parentKey].children.push({
                ...map[item.key],
                parentKey: undefined,
            })
        } else {
            result.push(map[item.key])
        }
    }

    return result
}

const createRoutes = (routes: RoutePagesType[]): RouteObject[] =>
    routes.map((route) => {
        if (route.type === 'middleware')
            return {
                path: route.path,
                element: <route.element />,
                children: route.children
                    ? createRoutes(route.children)
                    : undefined,
            }

        if (route.type === 'not-found')
            return {
                path: '*',
                element: (
                    <React.Suspense>
                        <motion.div
                            key={route.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            <route.element />
                        </motion.div>
                    </React.Suspense>
                ),
            }

        return {
            path: route.path,
            element: (
                <React.Suspense fallback={<Loading />}>
                    <motion.div
                        key={route.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <route.element />
                    </motion.div>
                </React.Suspense>
            ),
            children: route.children ? createRoutes(route.children) : undefined,
        }
    })

const router = createBrowserRouter(createRoutes(nestRoutes(orderedRoutes)))

export default function Router() {
    // return <Maintenance />
    return <RouterProvider router={router} />
}
