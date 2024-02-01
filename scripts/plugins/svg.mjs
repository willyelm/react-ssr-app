/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { readFile } from 'fs/promises';
import { parseFragment } from 'parse5';

export function camelCase(text) {
  return (text || '').replace(/[-\:]([a-z])/g, (g) => g[1].toUpperCase());
}

const replaceMap = {
  'class': 'className',
  'data-name': 'dataname'
}

export async function convertToJSX(
  content,
  options = {}
) {
  const node = parseFragment(content);
  const svg = node.childNodes.filter((node) => node.nodeName === 'svg');
  return transform(svg, options);
}

export function transform(
  nodes,
  options = {}
) {
  return nodes
    .filter(({ nodeName, value }) =>
      nodeName !== '#text' && !(value && !value.match(/\\n\\t{0,}/))
    )
    .map((node, index) => {
      const {
        attrs,
        tagName,
        childNodes
      } = node;
      const props = {
        key: index
      }
      if (attrs) {
        attrs.forEach(({ name, value }) => {
          const mappedName = (replaceMap)[name];
          if (name === 'style') {
            value = value.split(';').reduce((o, style) => {
              const [k, v] = style.split(":");
              return Object.assign(o, {
                [camelCase(k)]: v
              });
            }, {});
          }
          if (value !== undefined && value !== null && value !== '') {
            Object.assign(props, {
              [mappedName || camelCase(name)]: `${JSON.stringify(value)}`
            });
          }
        });
      }
      if (tagName === 'svg') {
        const svgProps = [
          'className',
          'width',
          'height',
          'fill'
        ];
        const internal = {};
        for (const p of svgProps) {
          const a = `props.${p}`;
          internal[p] = props[p] ? `${a} || ${props[p]}` : a;
        }
        Object.assign(props, {
          ...internal,
          ...options.props
        });
      }
      if (childNodes && childNodes.length > 0) {
        Object.assign(props, {
          children: `[props.title && jsx("title", { key: 'title', children: [props.title] }, void 0), ${transform(childNodes, {
            colors: options.colors
          })}]`
        });
      }
      const propsText = Object
        .keys(props)
        .map((name) => {
          let value = props[name];
          if (options.colors) {
            const modifiers = options.colors.filter((t) => {
              return camelCase(t.name) === name &&
                JSON.stringify(String(t.color).toLocaleLowerCase()) === String(props[name]).toLowerCase();
            });
            if (modifiers.length) {
              name = 'style';
              const style = props.style ? JSON.parse(props.style) : {};
              for (const m of modifiers) {
                Object.assign(style, {
                  [camelCase(m.name)]: `var(${m.variable})`
                });
              }
              value = props.style = JSON.stringify(style);
            }
          }
          return `${name}: ${value}`;
        })
        .join(', ');
      return tagName ?
        `jsx("${tagName}", { ${propsText} }, void 0)` :
        JSON.stringify('');
    });
};


export const svg = ({ jsxImportSource = 'react' } = {}) => {
  return {
    name: 'SVG',
    setup(build) {
      build.onLoad({ filter: /\.svg$/ }, async ({ path: origin }) => {
        const fileData = await readFile(origin);
        const svg = fileData.toString();
        const jsx = await convertToJSX(svg);
        return {
          contents: [
            `import { jsx } from '${jsxImportSource}/jsx-runtime';`,
            `export default (props) => {`,
            `  return ${jsx};`,
            '}'
          ].join(''),
          loader: 'js'
        };
      });
    },
  };
}

export default svg;
