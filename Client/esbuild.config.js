require('esbuild').build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'cjs',
    sourcemap: true,
    outfile: 'public/bundle.js',
    watch: true,
    plugins: [
        require('esbuild-css-modules-plugin')({
            inject: true,
        })
    ]
})