import { Link } from 'react-router-dom'
import { Button } from '@/web/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/web/components/ui/avatar'
import { useAuth } from '@/web/lib/auth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'

export function Header() {
    const auth = useAuth()

    return (
        <header className="w-full fixed z-20 shadow-sm border-b bg-background">
            <div className="mx-auto px-10 py-5 max-w-7xl">
                <div className="w-full justify-between flex items-center">
                    <Link to="/">
                        <img
                            src="/images/logo-sipeka-full-long.svg"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                    <nav className="flex gap-4 items-center">
                        <Button variant="ghost" asChild>
                            <Link to="/">Dashboard</Link>
                        </Button>

                        {!auth.user ? (
                            <Button variant="ghost" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={`https://ui-avatars.com/api/?name=${auth.user?.username}&background=0D8ABC&color=fff`}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span>{auth.user.username}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() => auth.logout()}
                                        >
                                            Logout
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
