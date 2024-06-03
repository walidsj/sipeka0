import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/**/*.ts', './src/**/*.js'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
})