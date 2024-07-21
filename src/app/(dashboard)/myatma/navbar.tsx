import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import { Card3d, Card3dItem } from '@/components/ui/card-3d'
import { HiOutlineDocumentReport, HiOutlineNewspaper } from 'react-icons/hi'

export default function Navbar() {
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
                            <HiOutlineNewspaper />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Rekapitulasi</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="gaji">
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
                            <HiOutlineDocumentReport />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Gaji</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="tunjangan">
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
                            <HiOutlineDocumentReport />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Tunjangan</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
            <NavLink to="jasa-pelayanan">
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
                            <HiOutlineDocumentReport />
                        </Card3dItem>
                        <Card3dItem translateZ={2}>Jasa Pelayanan</Card3dItem>
                    </Card3d>
                )}
            </NavLink>
        </nav>
    )
}
