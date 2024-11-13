'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import StepComponent from './step-component';
import StepsProgressBar from './steps-progress-bar';
import { getPassedSteps } from 'utils';
import { Answers } from 'app/types';
import { steps } from 'models/steps';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnswers } from 'app/store/answers-provider';
import { useResults } from 'app/store/results-provider';

const Quiz = () => {
  const [activeStep, setActiveStep] = useState(() => steps.find((el) => el.order === 1));
  const [isLoading, setIsLoading] = useState(false);
  const { answers, updateAnswers, clearAnswers } = useAnswers((state) => state);
  const addResult = useResults((state) => state.addResult);
  const router = useRouter();
  const searchParams = useSearchParams();

  const passedSteps = useMemo(() => getPassedSteps(answers), [answers]);

  if (!activeStep) return null;

  const goToStep = useCallback((stepOrder: number) => {
    const step = steps.find((el) => el.order === stepOrder);

    if (step) setActiveStep(step);
  }, []);

  const saveAnswers = (key: string, data: unknown) => {
    updateAnswers(key, data);
  };

  const finishQuiz = useCallback(
    async (key: string, data: Answers['preferences']) => {
      setIsLoading(true);
      const updatedAnswers = { ...answers, [key]: data };

      try {
        const resultsResponse = await fetch('/api/result', {
          method: 'POST',
          body: JSON.stringify(updatedAnswers),
          headers: { 'Content-Type': 'application/json' },
        });

        if (resultsResponse.ok) {
          try {
            const data = await resultsResponse.json();
            const params = new URLSearchParams(searchParams);
            const id = new Date().getTime().toString();
            addResult({ id, answers: updatedAnswers as Answers, suggestion: data });
            params.set('id', id);
            router.push(`/result/?${params.toString()}`);
          } catch (e) {
            console.error(e);
            throw e;
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [answers],
  );

  useEffect(() => {
    return () => clearAnswers();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex grow justify-center items-center text-3xl text-bold bg-background'>
          Loading...
        </div>
      ) : (
        <>
          <StepsProgressBar
            activeStepOrder={activeStep.order}
            passedSteps={passedSteps}
            goToStep={goToStep}
          />
          <StepComponent
            step={activeStep}
            goToStep={goToStep}
            passAnswers={saveAnswers}
            finishQuiz={finishQuiz}
          />
        </>
      )}
    </>
  );
};

export default Quiz;
