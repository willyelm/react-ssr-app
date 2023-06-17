import { createServer } from 'http';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Resolver } from './Resolver';
import { Metadata, metadata } from './Metadata';

export interface Config extends Metadata {
  port: number;
}

export function Application(
  jsx: JSX.Element,
  config: Config
) {
  metadata.title = config.title || '';
  metadata.meta = config.meta || {};
  return {
    middleware: {
      resolvers: [
        async (req, res) => {
          console.log('[request]', `Received ${req.url}`);
          const root = renderToString(<StaticRouter location={req.url}>{jsx}</StaticRouter>);
          const html = renderToString(<html lang="en">
            <head>
              <title>{metadata.title}</title>
              <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
              <meta content="en_US" httpEquiv="content-language" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="language" content="en_US" />
              {Object
                .keys(metadata.meta)
                .map((name, index) => {
                  return <meta
                    key={index}
                    name={name}
                    content={metadata.meta[name]} />;
                })}
              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" href="/favicon-192.png" />
              <link rel="mask-icon" href="favicon.svg" color="#282430" />
              <link rel='stylesheet' href='index.css' />
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: root }}></div>
              <script src='index.js'></script>
            </body>
          </html>);
          res.writeHead(200, {
            'Content-Type': `text/html; charset=UTF-8`
          });
          res.end(`<!DOCTYPE html>${html}`, 'utf-8');
        }
      ] as Resolver[],
      use(...resolver: Resolver[]) {
        this.resolvers.unshift(...resolver);
      }
    },
    run() {
      const server = createServer((request, response) => {
        const queue = [...this.middleware.resolvers];
        const next = () => {
          const current = queue.shift();
          current(request, response, next);
        };
        queue.length && next();
      });
      server.listen(config.port, '0.0.0.0', () => {
        console.log('[server]', `Listening on port ${config.port}`);
      });
    }
  }
}
