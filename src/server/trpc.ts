import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { db } from '@/server/db'

export const createTRPCContext = async (opts: { headers: Headers }) => {
    return {
        db,
        ...opts,
    }
}

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
