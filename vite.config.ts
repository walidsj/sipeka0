import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        react(),

        VitePWA({
            registerType: 'prompt',
            devOptions: {
                enabled: false,
            },
            outDir: path.resolve(__dirname, 'dist'),
            srcDir: path.resolve(__dirname, 'src/web'),
        }),
    ],
    server: {
        proxy: {
            '/api': `http://localhost:${Number(process.env.PORT ?? 3000)}`,
        },
    },
    root: path.resolve(__dirname, 'src/web'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    publicDir: path.resolve(__dirname, 'public'),
})
