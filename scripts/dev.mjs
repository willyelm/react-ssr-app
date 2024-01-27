import path from 'path';
import { context } from 'esbuild';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import run from './plugins/run.mjs';
import livereload from './plugins/livereload.mjs';
import postcss from './plugins/postcss.mjs';
import svg from './plugins/svg.mjs';

const workspace = process.cwd();
// Build NodeJS app
const serverContext = await context({
  platform: 'node',
  packages: 'external',
  bundle: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    server: path.join(workspace, 'src', 'server.tsx')
  },
  outdir: path.join(workspace, 'dist'),
  plugins: [
    svg(),
    run('server.js')
  ]
});
// Build browser app
const clientContext = await context({
  platform: 'browser',
  format: 'esm',
  bundle: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    index: path.join(workspace, 'src', 'index.tsx'),
    style: path.join(workspace, 'src', 'style.css')
  },
  outdir: path.join(workspace, 'public', 'dist'),
  plugins: [
    svg(),
    postcss({
      plugins: [
        tailwindcss(),
        autoprefixer
      ]
    }),
    livereload()
  ]
});

await serverContext.watch();
await clientContext.watch();
