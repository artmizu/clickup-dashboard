import { build } from 'esbuild'
import glob from 'glob-promise'
import { esbuildDecorators } from '@anatine/esbuild-decorators'

async function myBuilder() {
  let entryPoints = await glob('./src/**/*.ts')

  await build({
    platform: 'node',
    bundle: false,
    outdir: 'dist',
    format: 'esm',
    sourcemap: 'external',
    keepNames: true,
    plugins: [
      esbuildDecorators({
        cwd: process.cwd()
      })
    ],
    entryPoints
  })

  console.log(`🚀 Сборка прошла успешно`)
}

myBuilder()
