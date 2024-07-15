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
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="mx-auto flex w-full gap-3 overflow-x-auto px-5 py-4 md:px-8 lg:px-10 xl:px-12">
            <NavLink to="." end>
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-background'
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
                                isActive && 'bg-primary text-background'
                            )}
                        >
                            <FiEdit />
                        </div>
                        Anggaran
                    </Card>
                )}
            </NavLink>
            <NavLink to="pendapatan">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-background'
                            )}
                        >
                            <FiPocket />
                        </div>
                        Pendapatan
                    </Card>
                )}
            </NavLink>
            <NavLink to="belanja">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-background'
                            )}
                        >
                            <FiShoppingCart />
                        </div>
                        Belanja
                    </Card>
                )}
            </NavLink>
            <NavLink to="akuntansi">
                {({ isActive }) => (
                    <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                        <div
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-background'
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
                                isActive && 'bg-primary text-background'
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
