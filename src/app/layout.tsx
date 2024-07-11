import React from 'react'
import { Header } from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

export default function HomeLayout() {
    return (
        <React.Fragment>
            <Header />
            <div className="min-h-svh w-full bg-slate-100 pt-20">
                <Outlet />
            </div>
            <Footer />
        </React.Fragment>
    )
}
