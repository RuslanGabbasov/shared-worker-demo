const res = require('esbuild').buildSync({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'cjs',
    sourcemap: true,
    outfile: 'public/bundle.js',
    // external: ['react', 'react-dom'],
})