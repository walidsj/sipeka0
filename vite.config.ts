import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [react()],
    server: {
        proxy: {
            '/api': `http://localhost:${
                process.env.PORT ? parseInt(process.env.PORT) : 3000
            }`,
        },
    },
})
