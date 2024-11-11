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

        <main className='flex flex-col sm:grow lg:flex-row'>
          <div className='mb-10 flex flex-1 flex-col justify-center gap-2 p-5 pb-3 sm:mb-0 md:pb-4 lg:pb-16'>
            <h1 className='mb-2 text-5xl font-bold'>Career Skill Quiz & Suggestions</h1>
            <p className='mb-10 text-2xl'>Find your path, master new skills.</p>
            <p className='xl:max-w-[600px]'>
              Answer a few questions about your current skills and interests, and discover new
              opportunities for growth in your career.
            </p>
          </div>

          <div className='relative flex flex-1 flex-col items-center justify-end gap-2  md:gap-3 md:pb-8 lg:gap-4 lg:pb-16'>
            <Link
              href='/quiz'
              className='hover flex size-[150px] items-center justify-center rounded-full bg-teal-500/90 text-center font-bold text-white md:size-[180px] md:text-2xl lg:size-[230px] lg:text-4xl'
            >
              Start Quiz
            </Link>
            <div className='size-[200px] md:w-full lg:h-[300px] lg:w-[350px]'>
              <CurlyArrow color='#0d9488' />
            </div>
          </div>
        </main>
        <footer className=''></footer>
      </div>
    </div>
  );
}
