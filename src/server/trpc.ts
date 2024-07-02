import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { user } from './db/schema'
import { getSession } from './auth'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createTRPCContext = async ({
    req,
}: trpcExpress.CreateExpressContextOptions) => ({
    headers: req.headers,
    db,
    session: await getSession(req.headers.authorization ?? ''),
})

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            message:
                error.cause instanceof ZodError
                    ? 'Validation error: ' +
                      error.cause.errors
                          .map(
                              (e) =>
                                  `${e.path.join('.').toUpperCase()}: ${
                                      e.message
                                  }`
                          )
                          .join(', ')
                    : error.message,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        }
    },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const userProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const existedUser = await ctx.db.query.user.findFirst({
        where: eq(user.id, parseInt(ctx.session.id)),
    })

    return next({
        ctx: {
            user: existedUser,
        },
    })
})

export const adminProcedure = userProcedure.use(async ({ ctx, next }) => {
    if (ctx.user?.role !== 'ADMIN') {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Anda tidak memiliki hak akses (unauthorized)',
        })
    }

    return next()
})
