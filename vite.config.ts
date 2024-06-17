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
    server: {
        proxy: {
            '/api': `http://localhost:${process.env.PORT ? Number(process.env.PORT) : 3000}`,
        },
    },
    root: path.resolve(__dirname, 'src/web'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    publicDir: path.resolve(__dirname, 'public'),
    plugins: [
        react(),
        VitePWA({
            includeAssets: [
                '/images/**/*.png',
                '/images/**/*.jpg',
                '/images/**/*.jpeg',
                '/images/**/*.webp',
                '/images/**/*.svg',
                '/images/**/*.gif',
                'favicon.png',
            ],
            registerType: 'prompt',
            devOptions: {
                enabled: false,
            },
            outDir: path.resolve(__dirname, 'dist'),
            srcDir: path.resolve(__dirname, 'src/web'),
            manifest: {
                name: 'Aplikasi SIPEKA',
                short_name: 'SIPEKA',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                description: 'Sistem Informasi Pengelolaan Keuangan BLUD',
                scope: '/',
                orientation: 'portrait',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/images/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
})
