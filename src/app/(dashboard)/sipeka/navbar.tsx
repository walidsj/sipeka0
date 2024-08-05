import {
    FiEdit,
    FiFileText,
    FiHome,
    FiPocket,
    FiShare2,
    FiShoppingCart,
    FiTool,
} from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { NavLink, useLocation } from 'react-router-dom'
import { Card3d, Card3dItem } from '@/components/ui/card-3d'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="mx-auto flex w-full gap-3 overflow-x-auto px-5 py-4 md:px-8 lg:px-10 xl:px-12">
            <NavLink to="." end>
                {({ isActive }) => (
                    <Card3d
                        perspective={50}
                        className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                    >
                        <Card3dItem
                            translateZ={4}
                            rotateZ={15}
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiHome />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Home</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="anggaran">
                {({ isActive }) => (
                    <Card3d
                        perspective={50}
                        className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                    >
                        <Card3dItem
                            translateZ={4}
                            rotateZ={15}
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiEdit />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Anggaran</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="pendapatan/perekaman">
                <Card3d
                    perspective={50}
                    className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                >
                    <Card3dItem
                        translateZ={4}
                        rotateZ={15}
                        className={cn(
                            'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                            pathname.includes('pendapatan') &&
                                'bg-primary text-primary-foreground'
                        )}
                    >
                        <FiPocket />
                    </Card3dItem>
                    Pendapatan
                </Card3d>
            </NavLink>
            <NavLink to="belanja/perekaman">
                <Card3d
                    perspective={50}
                    className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                >
                    <Card3dItem
                        translateZ={4}
                        rotateZ={15}
                        className={cn(
                            'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                            pathname.includes('belanja') &&
                                'bg-primary text-primary-foreground'
                        )}
                    >
                        <FiShoppingCart />
                    </Card3dItem>
                    <Card3dItem translateZ={2}>Belanja</Card3dItem>
                </Card3d>
            </NavLink>
            <NavLink to="akuntansi">
                {({ isActive }) => (
                    <Card3d
                        perspective={50}
                        className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                    >
                        <Card3dItem
                            translateZ={4}
                            rotateZ={15}
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiFileText />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Akuntansi</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="lainnya">
                {({ isActive }) => (
                    <Card3d
                        perspective={50}
                        className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                    >
                        <Card3dItem
                            translateZ={4}
                            rotateZ={15}
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiTool />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Lainnya</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="integrasi/sipd/login">
                {({ isActive }) => (
                    <Card3d
                        perspective={50}
                        className="flex flex-row items-center text-nowrap py-2 pl-3 pr-5 font-semibold"
                    >
                        <Card3dItem
                            translateZ={4}
                            rotateZ={15}
                            className={cn(
                                'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <FiShare2 />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Integrasi</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
        </nav>
    )
}
