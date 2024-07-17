import ReloadButton from '@/components/reload-button'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'

export default function Footer() {
    const { data: version } = api.user.getVersion.useQuery()

    return (
        <footer className="w-full bg-background">
            <div className="mx-auto flex flex-col items-center justify-between px-5 py-2 md:flex-row md:px-8 md:pr-6 lg:px-8 lg:pr-6 xl:px-12">
                <p className="text-left text-xs">
                    <HiHeart className="mr-1 inline-block h-4 w-4 align-bottom text-red-500" />
                    <strong>Versi</strong>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={cn(
                                    'mx-1 h-auto px-2 py-0',
                                    version === '__VERSION__'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                )}
                            >
                                {'__VERSION__'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Frontend
                                        </TableCell>
                                        <TableCell>
                                            {'__VERSION__'}{' '}
                                            <FaCheckCircle className="ml-1 inline-flex text-green-500" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Backend
                                        </TableCell>
                                        <TableCell>
                                            {version}{' '}
                                            {version === '__VERSION__' ? (
                                                <FaCheckCircle className="ml-1 inline-flex text-green-500" />
                                            ) : (
                                                <FaExclamationCircle className="ml-1 inline-flex text-red-500" />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </PopoverContent>
                    </Popover>
                    Build {'__BUILDDATE__'}
                </p>
                <div className="text-right">
                    <ReloadButton />
                </div>
            </div>
        </footer>
    )
}
