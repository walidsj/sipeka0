import { env } from '@/env.server'
import { type JWTPayload, SignJWT, jwtVerify } from 'jose'
import { user } from '@/server/db/schema'

const secret = env.JWT_SECRET_KEY ?? 'secret'
const key = new TextEncoder().encode(secret)

export async function encrypt(payload: unknown) {
    return await new SignJWT(payload as JWTPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(key)
}

export async function decrypt(input: string): Promise<unknown> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload as unknown
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getSession(token: string) {
    if (!token) return null
    return (await decrypt(token)) as typeof user.$inferSelect
}
