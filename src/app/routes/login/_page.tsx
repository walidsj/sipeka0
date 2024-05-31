import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Link to="/users">
                <Button>User</Button>
            </Link>
        </div>
    )
}
