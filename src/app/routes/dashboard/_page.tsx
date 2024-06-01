import { api } from '@/web/trpc/react'
import { Link } from 'react-router-dom'

export default function Home() {
    const user = api.user.getProfile.useQuery()

    return (
        <div>
            <h1>Users</h1>
            <p className="mb-6">{user.data && JSON.stringify(user.data)}</p>
            <Link to="/" className="border border-black px-2">
                Home
            </Link>
        </div>
    )
}
