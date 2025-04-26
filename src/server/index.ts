import { appRouter } from './api/root'
import express from 'express'
import { createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import { createExpressMiddleware, type CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from './db'
import _ from 'lodash'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: async ({ req }: CreateExpressContextOptions) => ({
            headers: req.headers,
            db,
            session: await getSession(req.headers.authorization ?? ''),
        }),
        onError:
            process.env.NODE_ENV === 'development'
                ? ({ path, error }) => {
                      console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
                  }
                : undefined,
    })
)

app.use('/api/storage/files/belanja/:file', (req, res) => {
    res.sendFile(req.params.file, {
        root: 'storage/files/belanja',
    })
})
app.use('/api/storage/files/user-image/:file', (req, res) => {
    res.sendFile(req.params.file, {
        root: 'storage/files/user-image',
    })
})

// Proxy middleware configuration
const proxyOptions = {
    target: 'https://service.sipd.kemendagri.go.id',
    changeOrigin: true,
}

// Create the proxy middleware
const proxyMiddleware = createProxyMiddleware(proxyOptions)

// Use the proxy middleware
app.use('/api/proxy-sipd', proxyMiddleware)

app.use(express.static('dist'))

app.use('/{*splat}', (_req, res) => {
    //load dist/index.html
    res.sendFile('index.html', { root: 'dist' })
})

let port = 8089
if (process.env.NODE_ENV === 'development') port = 8989

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
