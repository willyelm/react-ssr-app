import { Head } from 'src/Application';

export function Home() {
  return <>
    <Head>
      <title> App - Home  </title>
      <meta name='description' content='This is my home page' />
    </Head>
    <article className='relative mx-auto max-w-xl py-32 text-center'>
      <h1 className='text-4xl font-medium mb-2'> Hello World </h1>
      <p>
        This is a damn simple home page
      </p>
    </article>
  </>;
}
