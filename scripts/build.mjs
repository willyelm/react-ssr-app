import path from 'path';
import { build } from 'esbuild';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import postcss from './plugins/postcss.mjs';
import svg from './plugins/svg.mjs';

const workspace = process.cwd();
// Build NodeJS app
await build({
  platform: 'node',
  packages: 'external',
  bundle: true,
  minify: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    server: path.join(workspace, 'src', 'server.tsx')
  },
  outdir: path.join(workspace, 'dist'),
  plugins: [
    svg()
  ]
});
// Build browser app
await build({
  platform: 'browser',
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    index: path.join(workspace, 'src', 'index.tsx'),
    style: path.join(workspace, 'src', 'style.css'),
  },
  outdir: path.join(workspace, 'public', 'dist'),
  plugins: [
    svg(),
    postcss({
      plugins: [
        tailwindcss(),
        autoprefixer
      ]
    })
  ]
})
