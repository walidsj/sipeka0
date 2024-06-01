import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="pt-5">
            <Outlet />
        </div>
    )
}
