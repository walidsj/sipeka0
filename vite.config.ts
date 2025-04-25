import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import replace from '@rollup/plugin-replace'
import { version } from './package.json'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            '/api': `http://localhost:8989`,
        },
    },
    root: path.resolve(__dirname, 'src/web'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    publicDir: path.resolve(__dirname, 'public'),
    plugins: [
        tailwindcss(),
        react(),
        replace({
            preventAssignment: true,
            __BUILDDATE__: Intl.DateTimeFormat('id', {
                dateStyle: 'long',
                timeStyle: 'long',
            }).format(new Date()),
            __VERSION__: version,
            __DASHBOARD_PREFIX__: '/sipeka',
            __CLIENT_PREFIX__: '/myatma',
        }),
    ],
})
