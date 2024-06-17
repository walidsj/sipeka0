import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig({
    entry: ['./src/**/*.ts', './src/**/*.js'],
    format: ['esm'],
    dts: true,
    splitting: true,
    sourcemap: false,
    clean: true,
    outDir: path.resolve(__dirname, 'build'),
})
