/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { PluginBuild } from 'esbuild';
import { readFile } from 'fs/promises';
import postcss from 'postcss';
import imports from 'postcss-import';
import modules from 'postcss-modules';
import crypto from 'crypto';

export const postcssPlugin = ({
  importCSS = true,
  plugins = []
} = {}) => {
  return {
    name: 'postcss',
    setup(build: PluginBuild) {

      const namespace = 'cssmodule:';
      const filter = new RegExp(`^${namespace}`);
      const ignored = []; // 'dark', 'focus', 'active', 'hover'
      const styles = new Map();

      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const origin = args.path;
        const isModule = origin.match(/\.module/);
        const raw = await readFile(origin, 'utf8');
        const id = namespace + Buffer.from(origin).toString('base64');
        const source = await postcss(
          isModule ?
            [
              imports,
              modules({
                generateScopedName(name, filename, css) {
                  const hash = crypto
                    .createHash('md5')
                    .update(css)
                    .digest('hex');
                  if (ignored.includes(name)) {
                    return name;
                  } else {
                    return `${name}${hash.substring(0, 5)}`;
                    // return hash.substring(0, 10);
                  }
                },
                getJSON() { }
              }),
              ...plugins
            ] : [imports, ...plugins]
        )
          .process(raw.toString(), {
            from: origin
          });

        // console.log([...styles.values()].flat());
        // if (origin === build.initialOptions.entryPoints['style']) {
        //   const cssModules = [...styles.values()].flat();
        //   source.css = `${source.css}${cssModules}`
        // }

        if (isModule) {
          const { exportTokens } = source.messages.find((m) => {
            return m.type === 'export' && m.plugin === 'postcss-modules';
          }) || { exportTokens: null };
          // .replace(/\s/gi, '')
          // const style = JSON.stringify(source.css.replace(/(\s){2,}/gi, ''));
          styles.set(id, source.css);
          const r = await build.resolve(`${id}`, {
            kind: 'import-statement',
            importer: 'test',
            resolveDir: '.'
          });
          console.log('e', r.errors);
          return {
            contents: [
              // `import { addStyle } from '${injectModule || nsName}';`,
              // `addStyle(${style});`,
              importCSS ? `import '${id}';` : '',
              `export default ${JSON.stringify(exportTokens)}`
            ].join(''),
            loader: 'js',
          }
        } else {
          return {
            contents: source.css,
            loader: 'css',
          };
        }
      });

      build.onResolve({ filter }, ({ path }) => {
        return { path, namespace }
      });

      build.onLoad({ filter, namespace }, ({ path }) => {
        return {
          contents: styles.get(path),
          loader: 'css',
        }
      });


    },
  };
}

export { postcssPlugin as postcss };
