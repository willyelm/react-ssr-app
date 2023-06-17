import path from 'path';
import { BuildOptions } from 'esbuild';
import autoprefixer from 'autoprefixer';
import nesting from 'postcss-nesting';
import { postcss } from './plugins/postcss';
import { svg } from './plugins/svg';

const workspace = process.cwd();

export const serverConfiguration: BuildOptions = {
  platform: 'node',
  packages: 'external',
  format: 'cjs',
  bundle: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    server: path.join(workspace, 'src', 'main.tsx')
  },
  outdir: path.join(workspace, 'dist'),
  plugins: [
    svg(),
    postcss({
      importCSS: false,
      plugins: [
        autoprefixer,
        nesting
      ]
    })
  ]
};

export const clientConfiguration: BuildOptions = {
  platform: 'browser',
  format: 'esm',
  bundle: true,
  sourcemap: 'external',
  logLevel: 'info',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    index: path.join(workspace, 'src', 'client.tsx'),
  },
  external: [],
  outdir: path.join(workspace, 'dist'),
  plugins: [
    svg(),
    postcss({
      plugins: [
        autoprefixer,
        nesting
      ]
    })
  ]
};
