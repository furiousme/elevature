'use client';

import { useState } from 'react';

// import { Answers } from 'app/types';
import StepComponent from 'components/step-component';
import StepsProgressBar from 'components/steps-progress-bar';
import { steps } from 'models/steps';

const Page = () => {
  const [activeStep, setActiveStep] = useState(() => steps.find((el) => el.order === 1));
  // const [answers, setAnswers] = useState<Answers>({});

  if (!activeStep) return null;

  const goToStep = (stepOrder: number) => {
    const step = steps.find((el) => el.order === stepOrder);

    if (step) setActiveStep(step);
  };

  return (
    <div className='flex min-h-screen flex-col overflow-hidden pt-8'>
      <StepsProgressBar activeStepOrder={activeStep.order} goToStep={goToStep} />
      <StepComponent step={activeStep} goToStep={goToStep} />
    </div>
  );
};

export default Page;
