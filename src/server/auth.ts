import { env } from '@/env'
import { SignJWT, jwtVerify } from 'jose'

const secret = env.JWT_SECRET_KEY ?? 'secret'
const key = new TextEncoder().encode(secret)

export async function encrypt(payload: any) {
    return await new SignJWT(payload as any)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload as any
    } catch (error) {
        return null
    }
}

export async function getSession(token: string) {
    if (!token) return null
    return await decrypt(token)
}
