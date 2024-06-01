import { Header } from './header'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="bg-slate-100 min-h-svh">
            <Header />
            <div className="w-full pt-20">
                <Outlet />
            </div>
        </div>
    )
}
