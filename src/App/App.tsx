import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './Home';
import { Blog } from './Blog/Blog';
import { NotFound } from './NotFound';

export const App: FunctionComponent = () => {
  return <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>;
}
