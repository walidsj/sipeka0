import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <Outlet />
        </div>
    )
}
