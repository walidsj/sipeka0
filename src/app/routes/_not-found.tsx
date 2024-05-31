import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <Link to="/" className="border border-black px-2">
                Back to Home
            </Link>
        </div>
    )
}
