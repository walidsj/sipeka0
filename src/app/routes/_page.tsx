import { Link } from 'react-router-dom'
import { Button } from '@/web/components/ui/button'

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Home page</p>
            <Link to="/dashboard">
                <Button>Dashboard</Button>
            </Link>
        </div>
    )
}
