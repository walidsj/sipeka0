import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export default function Navbar() {
    return (
        <Card>
            <CardContent className="p-1">
                <nav className="mx-auto flex w-full overflow-x-auto">
                    <NavLink
                        to="perekaman"
                        className={({ isActive }) =>
                            cn(isActive && 'text-primary')
                        }
                    >
                        <Button variant="ghost">
                            <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                            <span>Rekam</span>
                        </Button>
                    </NavLink>
                </nav>
            </CardContent>
        </Card>
    )
}
