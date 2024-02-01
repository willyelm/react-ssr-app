import { FunctionComponent } from 'react';
import { Head } from 'src/Application';

export const NotFound: FunctionComponent = () => {
  return <>
    <Head>
      <title>Not Found</title>
    </Head>
    <article className='relative mx-auto max-w-xl py-32 text-center'>
      <h1 className='text-4xl font-medium mb-2'> 404 </h1>
      <p className='my-5'>
        Page not found
      </p>
      <a href="/" className='text-neutral-500'>Back Home</a>
    </article>
  </>;
}
