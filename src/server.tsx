import path from 'path';
import {
  createServer,
  IncomingMessage,
  ServerResponse
} from 'http';
import { constants } from 'fs';
import { readFile, stat, access } from 'fs/promises';
import { renderToString } from 'react-dom/server';
import { ServerApp } from './App/ServerApp';

function getMimeType(filePath: string) {
  const type = path.extname(filePath).replace(/^\./, '');
  switch (type) {
    case 'js':
      return 'text/javascript';
    case 'htm':
    case 'html':
    case 'css':
      return `text/${type}`;
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
    default:
      return 'text/plain';
  }
}

async function getFileContent(filePath: string) {
  const exists = await access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
  if (exists) {
    const s = await stat(filePath);
    if (s.isFile()) {
      return await readFile(filePath);;
    } else if (s.isDirectory()) {
      return getFileContent(path.join(filePath, 'index.html'));
    }
  }
}

const port = 8000;
const server = createServer(async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = new URL(req.url, `http://${req.headers.host}/`);
  const filePath = path.join('public', path.normalize(url.pathname));
  const fileContent = await getFileContent(filePath);
  if (fileContent) {
    // console.log(`\n[FILE] ${filePath}`);
    const mimeType = getMimeType(filePath);
    res.writeHead(200, {
      'Content-Type': `${mimeType}; charset=UTF-8`
    });
    res.end(fileContent, 'utf-8');
  } else {
    console.log(`\n[${req.method}] ${url.pathname}`);
    const content = renderToString(<ServerApp location={req.url} />);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(`<!DOCTYPE html>${content}`, 'utf-8');
  }
});

server.listen(port);

console.log(`Running on port: ${port}`)
