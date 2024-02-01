import { FunctionComponent } from 'react';
import { Head } from 'src/Application';

export const Home: FunctionComponent = () => {
  return <>
    <Head>
      <title> App - Home  </title>
      <meta name='description' content='This is my home page' />
    </Head>
    <article className='relative mx-auto max-w-xl py-32 text-center'>
      <h1 className='text-4xl font-medium mb-2'> Hello World </h1>
      <p className='my-5'>
        This is a damn simple home page
      </p>
      <a href="/blog" className='text-neutral-500'> Read my blog </a>
    </article>
  </>;
}
