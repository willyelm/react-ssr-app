import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App/App';

hydrateRoot(
  document.querySelector('#root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
