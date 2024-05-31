import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        PORT: z.number().default(3000),
    },
    client: {},
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
