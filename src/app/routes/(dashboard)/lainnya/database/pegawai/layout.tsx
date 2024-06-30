import { Outlet } from 'react-router-dom'

export default function PegawaiLayout() {
    return (
        <div className="flex w-full flex-col gap-5 px-8 py-5">
            <Outlet />
        </div>
    )
}
