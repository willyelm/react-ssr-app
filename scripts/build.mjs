import { build } from 'esbuild';
import { appConfig, clientConfig } from './setup.mjs';

// Build NodeJS app
await build(appConfig);
// Build browser app
await build(clientConfig);
