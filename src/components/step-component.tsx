import { Answers, Step } from 'app/types';

type Props = {
  step: Step;
  goToStep: (stepNumber: number) => void;
  passAnswers: (key: string, data: unknown) => void;
  finishQuiz?: (key: string, data: Answers['preferences']) => void;
};

const StepComponent = ({ step, goToStep, passAnswers, finishQuiz }: Props) => {
  const StepForm = step.Form;

  return (
    <div className='container flex grow flex-col py-16'>
      <h1 className='mb-4 text-center text-2xl font-bold uppercase'>{step.title}</h1>
      <p className='mb-8 text-center text-lg opacity-80'>{step.description}</p>
      <StepForm goToStep={goToStep} passAnswers={passAnswers} finishQuiz={finishQuiz} />
    </div>
  );
};

export default StepComponent;
