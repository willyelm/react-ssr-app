/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { readFile } from 'fs/promises';
import postcss from 'postcss';
import imports from 'postcss-import';

export const postcssPlugin = ({
  plugins = []
} = {}) => {
  return {
    name: 'postcss',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const raw = await readFile(args.path, 'utf8');
        const source = await postcss([
          imports,
          ...plugins
        ]).process(raw.toString(), {
          from: args.path
        });
        return {
          contents: source.css,
          loader: 'css',
        };
      });
    }
  };
}

export default postcssPlugin;
