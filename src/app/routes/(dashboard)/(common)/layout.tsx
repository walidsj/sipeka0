import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="px-8 py-5">
            <Outlet />
        </div>
    )
}
