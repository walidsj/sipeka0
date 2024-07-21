import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import React from 'react'
import { Helmet } from 'react-helmet'

export default function DashboardLayout() {
    return (
        <React.Fragment>
            <Helmet>
                <title>MyAtma - Atmaku</title>
            </Helmet>
            <Navbar />
            <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
