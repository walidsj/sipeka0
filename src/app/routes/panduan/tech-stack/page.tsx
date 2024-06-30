import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function () {
    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <h2 className="text-3xl font-extrabold">Tech Stack</h2>
            <div className="py-8 text-justify">
                <p className="mb-5">
                    Tech stack merupakan suatu rangkaian teknologi yang
                    digunakan untuk membuat website atau aplikasi. Aplikasi
                    SIPEKA menggunakan teknologi terbaru sebagai berikut:
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/ts.png"
                                alt="TypeScript"
                                className="h-14 w-14"
                            />
                            <CardDescription>Language</CardDescription>
                            <CardTitle>TypeScript</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/react.png"
                                alt="ReactJS"
                                className="h-14 w-16"
                            />
                            <CardDescription>Frontend</CardDescription>
                            <CardTitle>ReactJS</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/hono.png"
                                alt="Hono"
                                className="h-14 w-12"
                            />
                            <CardDescription>Backend</CardDescription>
                            <CardTitle>Hono</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/tailwind.png"
                                alt="TailwindCSS"
                                className="h-14 w-20"
                            />
                            <CardDescription>Styling</CardDescription>
                            <CardTitle>TailwindCSS</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/mysql.png"
                                alt="MySQL"
                                className="h-14 w-16"
                            />
                            <CardDescription>Database</CardDescription>
                            <CardTitle>MySQL</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/drizzle.png"
                                alt="Drizzle"
                                className="h-14 w-14"
                            />
                            <CardDescription>Database ORM</CardDescription>
                            <CardTitle>Drizzle</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/trpc.svg"
                                alt="tRPC"
                                className="h-14 w-14"
                            />
                            <CardDescription>API Driver</CardDescription>
                            <CardTitle>tRPC</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/vite.png"
                                alt="Vite"
                                className="h-14 w-14"
                            />
                            <CardDescription>Build Tool</CardDescription>
                            <CardTitle>Vite</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/docker.png"
                                alt="Docker"
                                className="h-14 w-16"
                            />
                            <CardDescription>Container</CardDescription>
                            <CardTitle>Docker</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/nginx.svg"
                                alt="Nginx"
                                className="h-14 w-14"
                            />
                            <CardDescription>Web Server</CardDescription>
                            <CardTitle>Nginx</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <img
                                src="/images/icons/ubuntu.png"
                                alt="Ubuntu"
                                className="h-14 w-14"
                            />
                            <CardDescription>Operating System</CardDescription>
                            <CardTitle>Ubuntu</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}
