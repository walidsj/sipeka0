import { api } from '@/web/trpc/react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
    const hello = api.hello.world.useQuery()

    return (
        <div>
            <h1>Home</h1>
            <p>Home page</p>
            <p className="mb-2">Greeting: {hello.data?.message}</p>
            <Link to="/users">
                <Button>User</Button>
            </Link>
        </div>
    )
}
