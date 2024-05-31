import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function HomeLayout() {
    return (
        <div>
            <header className="w-full fixed z-20 border-b">
                <div className="max-w-7xl mx-auto px-6 py-2">
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
            <div className="pt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
