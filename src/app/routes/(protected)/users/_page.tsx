import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Users</h1>
            <p>Users page</p>
            <Link to="/" className="border border-black px-2">
                Home
            </Link>
        </div>
    )
}
