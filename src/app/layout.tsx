import React from 'react'
import { Header } from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

export default function HomeLayout() {
    return (
        <React.Fragment>
            <Header />
            <div className="flex min-h-svh w-full flex-col gap-5 bg-slate-100 pt-20">
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}
