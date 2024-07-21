import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FlipWords } from '@/components/ui/flip-words'
import {
    Card3dContent,
    Card3d,
    Card3dItem,
    Card3dHeader,
} from '@/components/ui/card-3d'
import { ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, Legend, XAxis } from 'recharts'
import { api } from '@/trpc/react'

export default function Home() {
    const words = ['newest', 'secure', 'modern']

    const { data: chartData } = api.belanja.getRealisasiHome.useQuery()

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col items-center justify-between gap-5 rounded-lg px-5 py-14 md:flex-row md:gap-16 md:px-8 lg:px-10 xl:px-12">
                <div className="w-full">
                    <div className="mb-10 flex">
                        <div className="text-4xl font-extrabold">
                            We've built <span className="text-blue-500">a</span>
                            <FlipWords
                                className="text-blue-500"
                                words={words}
                            />{' '}
                            <br />
                            financial information system for you
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Card3d>
                            <Card3dHeader>
                                <Card3dItem translateZ={30}>
                                    <div>
                                        <img
                                            src="/images/logo-sipeka-full-long.svg"
                                            className="h-10"
                                        />
                                    </div>
                                </Card3dItem>
                                <Card3dItem translateZ={40}>
                                    <CardDescription>
                                        Manajemen Keuangan BLUD RSJD Atma Husada
                                        Mahakam
                                    </CardDescription>
                                </Card3dItem>
                            </Card3dHeader>
                            <Card3dContent>
                                <Card3dItem translateZ={30}>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full md:w-auto"
                                    >
                                        <Link to="__DASHBOARD_PREFIX__">
                                            Akses
                                            <FiArrowRight className="ml-3 h-5 w-5 shrink-0" />
                                        </Link>
                                    </Button>
                                </Card3dItem>
                            </Card3dContent>
                        </Card3d>
                        <Card3d>
                            <Card3dHeader>
                                <Card3dItem translateZ={30}>
                                    <div>
                                        <img
                                            src="/images/logo-myatma.svg"
                                            className="h-10"
                                        />
                                    </div>
                                </Card3dItem>
                                <Card3dItem translateZ={40}>
                                    <CardDescription>
                                        Sistem Informasi Keuangan Pegawai RSJD
                                        Atma Husada Mahakam
                                    </CardDescription>
                                </Card3dItem>
                            </Card3dHeader>
                            <Card3dContent>
                                <Card3dItem translateZ={30}>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full md:w-auto"
                                    >
                                        <Link to="__CLIENT_PREFIX__">
                                            Akses
                                            <FiArrowRight className="ml-3 h-5 w-5 shrink-0" />
                                        </Link>
                                    </Button>
                                </Card3dItem>
                            </Card3dContent>
                        </Card3d>
                    </div>
                </div>
                <div className="w-full flex-shrink-0 md:max-w-md lg:max-w-lg">
                    {chartData && (
                        <ChartContainer
                            className="min-h-[75svh] w-full md:min-h-[70svh] lg:min-h-[65svh] xl:min-h-[60svh]"
                            config={{
                                realisasi: {
                                    label: 'Realisasi',
                                    color: '#3c83f6',
                                },
                            }}
                        >
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <Bar
                                    dataKey="realisasi"
                                    fill="var(--color-realisasi)"
                                    radius={10}
                                    maxBarSize={110}
                                    label={{
                                        position: 'top',
                                        formatter: (value: number) =>
                                            `Rp${Intl.NumberFormat('id').format(
                                                value
                                            )} (${(
                                                (value /
                                                    chartData.reduce(
                                                        (acc, cur) =>
                                                            acc + cur.realisasi,
                                                        0
                                                    )) *
                                                100
                                            ).toFixed(2)}%)`,
                                    }}
                                />
                                <Legend />
                            </BarChart>
                        </ChartContainer>
                    )}
                </div>
            </div>
        </div>
    )
}
