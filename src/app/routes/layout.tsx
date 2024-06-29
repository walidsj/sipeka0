import React from 'react'
import { Header } from './header'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <React.Fragment>
            <Header />
            <div className="min-h-screen w-full bg-slate-100 pt-20">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
