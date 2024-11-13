'use client';

import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className='flex flex-col debug min-h-screen justify-center items-center text-3xl text-bold bg-background'>
      <h1 className='block mb-20'>Sorry, something went wrong... </h1>
      <Link
        href='/'
        className='hover btn mx-auto mb-16  flex min-w-[200px]  rounded-full border border-accent p-5 font-bold uppercase text-white'
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
