import path from 'path';
import { Application } from './Server';
import { FileMiddleware } from './Server/Middleware/File';
import { App } from './App/App';
// Create a minimal application based on App component
const app = Application(<App />, {
  port: 3000,
  title: '[App Name]'
});
// Register middleware's
app.middleware.use(
  // This allows to serve dist files since all bundle files(index.js, style.css) 
  // are in the same location 
  FileMiddleware(path.resolve(__dirname)),
  // Public files
  FileMiddleware(path.resolve('public'))
);
// start application server
app.run();
