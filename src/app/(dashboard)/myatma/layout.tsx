import { Outlet } from 'react-router-dom'
import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarSkeleton from '@/components/navbar-skeleton'

const Navbar = React.lazy(() => import('./navbar'))

export default function DashboardLayout() {
    return (
        <React.Fragment>
            <Helmet>
                <title>MyAtma - Atmaku</title>
            </Helmet>
            <React.Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </React.Suspense>
            <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
