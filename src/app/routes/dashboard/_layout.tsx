import { Outlet, useLocation } from 'react-router-dom'

export default function HomeLayout() {
    const { pathname } = useLocation()
    return (
        <div className="w-full p-3 border border-black flex flex-col bg-yellow-200">
            <div className="mb-3">
                <h1>Users Layout</h1>
                <code>{pathname}</code>
            </div>
            <div className="p-3 bg-white">
                <Outlet />
            </div>
        </div>
    )
}
