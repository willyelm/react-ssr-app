import { context } from 'esbuild';

import run from './plugins/run.mjs';
import livereload from './plugins/livereload.mjs';
import { appConfig, clientConfig } from './setup.mjs';

const devAppConfig = {
  ...appConfig,
  minify: false
}

devAppConfig.plugins.push(run('server.js'));

const devClientConfig = {
  ...clientConfig,
  minify: false
}
devClientConfig.plugins.push(livereload());

const appContext = await context(devAppConfig);
const clientContext = await context(devClientConfig);

await appContext.watch();
await clientContext.watch();
