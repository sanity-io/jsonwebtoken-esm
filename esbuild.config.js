import esbuild from 'esbuild'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import alias from 'esbuild-plugin-alias'
import { readFile } from 'fs/promises'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// import {exports as pkgExports} from './package.json' assert {type: 'json'}
const { exports: pkgExports } = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

const entryPoints = new Set()
for (const path of Object.values(pkgExports)) {
  entryPoints.add(path.replace(/^\.\/dist/, 'src'))
}

esbuild
  .build({
    entryPoints: [...entryPoints],
    bundle: true,
    platform: 'browser',
    outdir: 'dist',
    sourcemap: true,
    splitting: true,
    plugins: [
      alias({ crypto: require.resolve('crypto-browserify') }),
      NodeModulesPolyfillPlugin(),
      NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
      }),
    ],
    format: 'esm',
  })
  .catch((error) => {
    console.error(error)
    process.nextTick(() => process.exit(1))
  })
