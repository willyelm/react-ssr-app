import { serverConfiguration, clientConfiguration } from './config';
import { run } from './plugins/run';
import livereload from './plugins/livereload';
import { context } from 'esbuild';

async function watch() {

  serverConfiguration.plugins.push(run('server.js'));
  clientConfiguration.plugins.push(livereload());

  let serverContext = await context(serverConfiguration);
  await serverContext.watch();

  let clientContext = await context(clientConfiguration);
  await clientContext.watch();

  console.log('watching...');
}

watch();
