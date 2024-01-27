import { Head } from 'src/Application';

export function NotFound() {
  return <>
    <Head>
      <title>Not Found</title>
    </Head>
    <article className='relative mx-auto max-w-xl py-32 text-center'>
      <h1 className='text-4xl font-medium mb-2'> 404 </h1>
      <p>
        Page not found
      </p>
    </article>
  </>;
}
