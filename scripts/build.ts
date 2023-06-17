import { serverConfiguration, clientConfiguration } from './config';
import { build } from 'esbuild';

build({
  minify: true,
  ...serverConfiguration
});
build({
  minify: true,
  ...clientConfiguration
});
