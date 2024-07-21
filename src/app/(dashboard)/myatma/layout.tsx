import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import React from 'react'

export default function DashboardLayout() {
    return (
        <React.Fragment>
            <Navbar />
            <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
