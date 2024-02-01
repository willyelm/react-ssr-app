import { FunctionComponent } from 'react';
import mdx from './Hello.mdx';

export const Blog: FunctionComponent = () => {
  return <>
    <main className='flex flex-col w-full'>

      <section className='relative mt-32 mx-auto max-w-xl text-center'>
        <h1 className='text-4xl font-medium mb-2'> Blog </h1>
        <article className='border border-neutral-500 p-5 my-5'>
          {mdx({
            components: {
              h1(props: any) {
                return <h1 className='text-2xl font-medium mb-2' {...props} />;
              }
            }
          })}
        </article>

        <a href="/" className='text-neutral-500'>Back Home</a>

      </section>

    </main>
  </>
}
