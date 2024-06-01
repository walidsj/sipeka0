import { type JWTPayload, SignJWT, jwtVerify } from 'jose'
import { env } from '@/env'

const secret = env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secret)

interface SessionPayload extends JWTPayload {
    id: string
    username: string
    role: string
}

export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(key)
}

export async function decrypt(input: string): Promise<SessionPayload> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })
    return payload as SessionPayload
}

export async function getSession(token: string) {
    if (!token) return null
    return await decrypt(token)
}
