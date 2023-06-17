import path from 'path';
import { statSync, existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { Middleware } from './index';

function getMimeType(filePath: string) {
  const type = path.extname(filePath).replace(/^\./, '');
  switch (type) {
    case 'js':
      return 'text/javascript';
    case 'css':
      return 'text/css';
    // Image
    case 'jpeg':
    case 'jpg':
    case 'gif':
    case 'png':
      return `image/${type}`;
    case 'ico':
      return 'image/vnd.microsoft.icon';
    // Video
    case 'mp4':
      return `video/${type}`;
    case 'htm':
    case 'html':
      return 'text/html';
    default:
      return 'text/plain';
  }
}

async function findFile(filePath: string) {
  const exists = existsSync(filePath);
  if (exists) {
    const stats = statSync(filePath);
    if (stats.isFile()) {
      const content = await readFile(filePath);
      return content;
    } else if (stats.isDirectory()) {
      return findFile(path.join(filePath, 'index.html'));
    }
  }
  return null;
}

export const FileMiddleware: Middleware = (contentBase: string) => {
  return async (request, response, next) => {
    const { headers } = request;
    const protocol = 'http';
    const baseURL = protocol + '://' + headers.host + '/';
    const url = new URL(request.url, baseURL);
    // const period = 31536000;
    const filePath = path.join(contentBase, path.normalize(url.pathname));
    const content = await findFile(filePath);
    if (content) {
      console.log('[file]', `Reading file ${filePath}`);
      const mimeType = getMimeType(filePath);
      response.writeHead(200, {
        'Content-Type': `${mimeType}; charset=UTF-8`,
        // 'Cache-control': `public, max-age=${period}`,
        // 'Access-Control-Allow-Origin': '*'
      });
      response.end(content, 'utf-8');
    } else {
      next();
    }
  }
}
