'use client';

import { useCallback, useMemo, useState } from 'react';

import { Answers } from 'app/types';
import StepComponent from 'components/step-component';
import StepsProgressBar from 'components/steps-progress-bar';
import { steps } from 'models/steps';

const getPassedSteps = (answers: Partial<Answers>) => {
  return Object.keys(answers).reduce((acc, key) => {
    const step = steps.find((el) => el.key === key);

    console.log('calculate passed steps');

    return step ? [...acc, step.order] : acc;
  }, [] as number[]);
};

const Page = () => {
  const [activeStep, setActiveStep] = useState(() => steps.find((el) => el.order === 1));
  const [answers, setAnswers] = useState<Partial<Answers>>({});

  const passedSteps = useMemo(() => getPassedSteps(answers), [answers]);

  if (!activeStep) return null;

  const goToStep = useCallback((stepOrder: number) => {
    const step = steps.find((el) => el.order === stepOrder);

    if (step) setActiveStep(step);
  }, []);

  const saveAnswers = (key: string, data: unknown) =>
    setAnswers((prev) => ({ ...prev, [key]: data }));

  // eslint-disable-next-line no-console
  console.log('answers', answers);

  return (
    <div className='flex min-h-screen flex-col overflow-hidden pt-8'>
      <StepsProgressBar
        activeStepOrder={activeStep.order}
        passedSteps={passedSteps}
        goToStep={goToStep}
      />
      <StepComponent step={activeStep} goToStep={goToStep} passAnswers={saveAnswers} />
    </div>
  );
};

export default Page;
