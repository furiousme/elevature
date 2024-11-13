'use client';

import { useCallback, useMemo, useState } from 'react';
import StepComponent from './step-component';
import StepsProgressBar from './steps-progress-bar';
import { getPassedSteps } from 'utils';
import { Answers } from 'app/types';
import { steps } from 'models/steps';
import { useRouter } from 'next/navigation';

const Quiz = () => {
  const [activeStep, setActiveStep] = useState(() => steps.find((el) => el.order === 1));
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const router = useRouter();

  const passedSteps = useMemo(() => getPassedSteps(answers), [answers]);

  if (!activeStep) return null;

  const goToStep = useCallback((stepOrder: number) => {
    const step = steps.find((el) => el.order === stepOrder);

    if (step) setActiveStep(step);
  }, []);

  const saveAnswers = (key: string, data: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: data }));
  };

  const finishQuiz = useCallback(
    async (key: string, data: Answers['preferences']) => {
      const updatedAnswers = { ...answers, [key]: data };
      setAnswers(updatedAnswers);

      try {
        const resultsResponse = await fetch('/api/result', {
          method: 'POST',
          body: JSON.stringify(updatedAnswers),
          headers: { 'Content-Type': 'application/json' },
        });

        if (resultsResponse.ok) {
          const data = await resultsResponse.json();
          console.log('OK', data);
          router.push('/summary');
        }
      } catch (e) {
        console.error(e);
      }
    },
    [answers],
  );

  return (
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
  );
};

export default Quiz;
