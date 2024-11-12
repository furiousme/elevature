import { MouseEvent, useState } from 'react';

import config from '../../../tailwind.config';

import { Answers } from 'app/types';
import Dropdown from 'components/dropdown';
import ArrowRight from 'components/icons/arrow-right';
import { industries } from 'models/options';
import { steps } from 'models/steps';

const colors = config.theme.extend.colors;

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { jobTitle, industry }: Answers['basic']) => void;
};

const Step1Form = ({ goToStep, passAnswers }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 1));
  const [industry, setIndustry] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!jobTitle || !industry) return;
    passAnswers('basic', { jobTitle, industry });
    goToStep(step.order + 1);
  };

  return (
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        <div className='mb-10'>
          <label className='mb-4 block'>
            What is your current job title or primary role? (e.g., Software Developer, Teacher,
            Sales Associate)
          </label>
          <input
            type='text'
            placeholder='Current job title'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)} // add validation
            className='w-full rounded-md border border-inactive bg-background px-4 py-2.5 text-lg outline-accent'
          />
        </div>

        <p className='mb-4'>
          Which industry do you currently work in or are most interested in? (e.g., Technology,
          Education, Healthcare)
        </p>
        <Dropdown
          label='Select industry'
          options={industries}
          selected={industry}
          saveSelected={setIndustry}
        />
      </div>
      <button
        className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
        disabled={!jobTitle || !industry}
        onClick={handleSubmit}
      >
        Next
        <ArrowRight color={colors.accent} />
      </button>
    </form>
  );
};

export default Step1Form;
