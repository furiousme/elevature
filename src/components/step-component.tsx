import { Step } from 'app/types';

type Props = {
  step: Step;
  goToStep: (stepNumber: number) => void;
};

const StepComponent = ({ step, goToStep }: Props) => {
  return (
    <div className='container flex grow flex-col py-16'>
      <h1 className='mb-8 text-center text-3xl font-bold uppercase'>{step.title}</h1>
      <p className='text-center text-xl opacity-80'>{step.description}</p>
      <div className='grow'>QUIZ here</div>
      <div className='flex justify-center'>
        <button
          className='hover mt-8 block min-w-[200px] rounded-full border border-accent p-5 font-bold uppercase text-white'
          onClick={() => goToStep(step.order + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepComponent;
