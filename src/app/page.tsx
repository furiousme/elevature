import Link from 'next/link';

import CurlyArrow from 'components/icons/curly-arrow';

export default function Home() {
  return (
    <div className='relative flex min-h-screen overflow-hidden'>
      <div className='bg-circle-top' />
      <div className='bg-circle-bottom' />
      <div className='container mx-auto flex min-h-full flex-col'>
        <header className='p-5'>
          <Link href='/' className='hover text-xl font-bold uppercase'>
            Elevature
          </Link>
        </header>

        <main className='flex grow'>
          <div className='flex flex-1 flex-col justify-center gap-2 p-5 pb-16'>
            <h1 className='mb-2 text-5xl font-bold'>Career Skill Quiz & Suggestions</h1>
            <p className='mb-10 text-2xl'>Find your path, master new skills.</p>
            <p className='xl:max-w-[600px]'>
              Answer a few questions about your current skills and interests, and discover new
              opportunities for growth in your career.
            </p>
          </div>

          <div className='relative flex flex-1 flex-col items-center justify-end gap-4 pb-16'>
            <Link
              href='/quiz'
              className='hover flex size-[230px] items-center justify-center rounded-full bg-teal-500/90 text-center text-4xl font-bold text-white'
            >
              Get started
            </Link>
            <div className=''>
              <CurlyArrow color='#0d9488' />
            </div>
          </div>
        </main>
        <footer className=''></footer>
      </div>
    </div>
  );
}
