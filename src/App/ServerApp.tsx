import { StaticRouter } from 'react-router-dom/server';
import { useApplication } from 'src/Application';
import { App } from './App';

export type ServerApp = {
  location: string;
}

export function ServerApp(params: ServerApp) {
  const { Head, Root } = useApplication(
    <StaticRouter location={params.location}>
      <App />
    </StaticRouter>);
  return <>
    <html lang="en">
      <head>
        <Head />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="language" content="en_US" />
        <meta httpEquiv="content-language" content="en_US" />
        <link rel='stylesheet' href='/dist/style.css' />
      </head>
      <body>
        <base href="/" />
        <Root id="root" className='flex h-screen' />
        <script src='/dist/index.js'></script>
      </body>
    </html>
  </>
}
