import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="h-[calc(100svh-80px)] flex flex-row bg-background">
            <div className="w-3/5 bg-slate-100 bg-[url(images/side-img.jpg)] bg-cover bg-bottom"></div>
            <div className="w-2/5 flex justify-center items-center px-5">
                <Outlet />
            </div>
        </div>
    )
}
