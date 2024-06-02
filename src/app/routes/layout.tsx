import React from 'react'
import { Header } from './header'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <React.Fragment>
            <Header />
            <div className="w-full pt-20">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
