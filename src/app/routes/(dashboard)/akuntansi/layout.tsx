import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <Outlet />
        </div>
    )
}
