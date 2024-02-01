// import mdx from '@mdx-js/esbuild'
import path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import mdx from '@mdx-js/esbuild'

import postcss from './plugins/postcss.mjs';
import svg from './plugins/svg.mjs';

const workspace = process.cwd();

// Build NodeJS app
export const appConfig = {
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
    svg(),
    mdx()
  ]
};

// Build browser app
export const clientConfig = {
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
    mdx(),
    postcss({
      plugins: [
        tailwindcss(),
        autoprefixer
      ]
    })
  ]
};
