import {
    FiEdit,
    FiFileText,
    FiHome,
    FiPocket,
    FiShoppingCart,
    FiTool,
} from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="mx-auto flex w-full gap-3 overflow-x-auto px-5 py-4 md:px-8 lg:px-10 xl:px-12">
            <NavLink to="." end>
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiHome />
                        </div>
                        Home
                    </Card>
                )}
            </NavLink>
            <NavLink to="anggaran">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiEdit />
                        </div>
                        Anggaran
                    </Card>
                )}
            </NavLink>
            <NavLink to="pendapatan/perekaman">
                <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                    <div
                        className={cn(
                            'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                            pathname.includes('pendapatan') &&
                                'bg-primary text-primary-foreground'
                        )}
                    >
                        <FiPocket />
                    </div>
                    Pendapatan
                </Card>
            </NavLink>
            <NavLink to="belanja/perekaman">
                <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                    <div
                        className={cn(
                            'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                            pathname.includes('belanja') &&
                                'bg-primary text-primary-foreground'
                        )}
                    >
                        <FiShoppingCart />
                    </div>
                    Belanja
                </Card>
            </NavLink>
            <NavLink to="akuntansi">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiFileText />
                        </div>
                        Akuntansi
                    </Card>
                )}
            </NavLink>
            <NavLink to="lainnya">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiTool />
                        </div>
                        Lainnya
                    </Card>
                )}
            </NavLink>
        </nav>
    )
}
