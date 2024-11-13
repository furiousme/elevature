'use client';

import { useResults } from 'app/store/results-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ResultScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const result = useResults((state) => state.results.find((result) => result.id === id));

  useEffect(() => {
    if (!id || !result) {
      router.push('/');
    }
  });

  throw new Error('Hey from error');

  return (
    <main className='relative flex min-h-screen overflow-hidden pt-32'>
      <div className='bg-circle-left' />
      <div className='bg-circle-bottom-right' />
      <div className='container flex min-h-full flex-col max-w-screen-md pb-20'>
        <h1 className='text-3xl mb-10 font-bold text-center'>
          Your Career & Skill Recommendations
        </h1>
        <p className='font-semibold text-center text-lg mb-10'>
          Based on your answers, we’ve identified skills to focus on and career paths that may
          interest you.
        </p>
        <h2 className='font-bold text-lg mb-4 text-accent'>Summary</h2>
        <p className='font-medium mb-10'>{result?.suggestion?.summary}</p>
        <h2 className='font-bold text-lg mb-4 text-accent'>Skills to Develop</h2>
        <ul className='font-medium mb-10'>
          {result?.suggestion.skills_to_develop.map((el) => {
            return (
              <li key={el} className='mb-2'>
                {el}
              </li>
            );
          })}
        </ul>
        <h2 className='text-accent mb-4 font-bold text-lg'>Suggested Career Paths:</h2>
        <ul className='font-medium mb-10'>
          {result?.suggestion.career_path.map((el) => {
            return (
              <li key={el} className='mb-2'>
                {el}
              </li>
            );
          })}
        </ul>
        <button
          className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
          onClick={() => router.push('/quiz')}
        >
          Retake Quiz
        </button>

        <button
          className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default ResultScreen;
