import plugin from 'bun-plugin-tailwind'
import { existsSync } from 'fs'
import { rm } from 'fs/promises'
import path from 'path'

const outdir = '.dist'

const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
}

console.log('\n🚀 Starting build process...\n')

const start = performance.now()

if (existsSync(outdir)) {
    console.log(`🗑️ Cleaning previous build at ${outdir}`)
    await rm(outdir, { recursive: true, force: true })
}

const result = await Bun.build({
    outdir,
    entrypoints: ['src/web/index.html'],
    plugins: [plugin],
    splitting: true,
    target: 'browser',
    sourcemap: 'none',
    publicPath: '/assets/',
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
})

const end = performance.now()

const outputTable = result.outputs.map((output) => ({
    File: path.relative(process.cwd(), output.path),
    Type: output.kind,
    Size: formatFileSize(output.size),
}))

console.table(outputTable)
const buildTime = (end - start).toFixed(2)

console.log(`\n✅ Build completed in ${buildTime}ms\n`)
