import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="p-4">
            <Outlet />
        </div>
    )
}
