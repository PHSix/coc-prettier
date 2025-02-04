async function start() {
  await require('esbuild').build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development',
    mainFields: ['module', 'main'],
    external: ['coc.nvim', 'prettier'],
    platform: 'node',
    target: 'node12.12',
    outfile: 'lib/index.js'
  })
}

start().catch((e) => {
  console.error(e)
})
