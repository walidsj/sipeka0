import { Header } from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

export default function HomeLayout() {
    return (
        <div className="flex h-svh w-full flex-col bg-slate-100">
            <Header />
            <div className="flex-1 overflow-x-hidden overflow-y-scroll pb-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
