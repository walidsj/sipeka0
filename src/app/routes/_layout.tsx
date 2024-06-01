import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/web/components/ui/button'

export default function HomeLayout() {
    return (
        <div>
            <header className="w-full fixed z-20 border-b shadow-sm bg-background">
                <div className="max-w-6xl mx-auto px-5 py-5">
                    <div className="w-full justify-between flex items-center">
                        <Link to="/">
                            <img
                                src="/images/logo-sipeka-full-long.svg"
                                alt="Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                        <nav className="flex gap-4 items-center">
                            <Link to="/">
                                <Button variant="ghost">Home</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
