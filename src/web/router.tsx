import { HashRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

const importedRoutes = import.meta.glob(
    './routes/**/(_layout|_page|_not-found).tsx'
)

type RouteType = {
    key: string
    path: string
    segments: string[]
    type: string
    element: React.ExoticComponent<any>
}

const routes: RouteType[] = Object.keys(importedRoutes).map((key) => {
    const type = key.match(/\/\_([^\/]+)\.tsx$/) // _layout, _page, _not-found

    const path = key
        .replace(/[^\/]+\.tsx$/, '') // remove file name
        .replace(/\.\/routes/g, '') // remove ./routes
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
        element: React.lazy(importedRoutes[key] as any),
    }
})

interface RouteLayoutType extends RouteType {
    layout: RouteType | null
}

function layoutResolver(objRoute: RouteType) {
    const listOfLayouts = routes
        .filter((route: RouteType) => {
            return route.type === 'layout'
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
    return listOfLayouts[listOfLayouts.length - 1] ?? null
}

const orderedRoutes = routes.map((route) => {
    const layout = layoutResolver(route)
    return {
        ...route,
        layout,
    }
})

interface RoutePagesType extends RouteLayoutType {
    children: RoutePagesType[]
}

function nestRoutes(data: RouteLayoutType[]) {
    const map: { [key: string]: RoutePagesType } = {}

    for (const item of data) {
        map[item.key] = { ...item, children: [] }
    }

    const result: RoutePagesType[] = []

    for (const item of data) {
        if (item.layout && map[item.layout.key]) {
            map[item.layout.key].children.push(map[item.key])
        } else {
            result.push(map[item.key])
        }
    }

    return result
}

const nest = nestRoutes(orderedRoutes)

console.log(nest)

function renderPagesRouter(routes: RoutePagesType[]) {
    return routes.map((route) => {
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
    return (
        <HashRouter>
            <Routes>{renderPagesRouter(nest)}</Routes>
        </HashRouter>
    )
}
