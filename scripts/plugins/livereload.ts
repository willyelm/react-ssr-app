/**
 * @author Will Medina <williams.medinaa@gmail.com>
 */
import { PluginBuild } from 'esbuild';
import { createServer } from 'http';

export const livereload = () => {
  const port = 8082;
  const baseURL = `http://localhost:${port}`;
  return {
    name: 'reload',
    setup(build: PluginBuild) {
      const clients = [];
      const banner = `(() => new EventSource("${baseURL}").onmessage = () => location.reload())();`
      // Add banner 
      build.initialOptions.banner ??= {};
      if (build.initialOptions.banner.js) {
        build.initialOptions.banner.js += `;${banner}`;
      } else {
        build.initialOptions.banner.js = banner;
      }
      // Reload
      build.onEnd((result) => {
        setTimeout(() => {
          clients.forEach((res) => res.write('data: update\n\n'));
          clients.length = 0;
        }, 500);
        result.errors.length > 0 && console.error(result.errors);
      });
      createServer((req, res) => {
        return clients.push(
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            Connection: 'keep-alive',
          }),
        );
      }).listen(8082);
    }
  };
};

export default livereload;
