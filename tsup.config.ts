import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig({
    entry: ['./src/**/*.ts', './src/**/*.js'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    outDir: path.resolve(__dirname, 'build'),
})
