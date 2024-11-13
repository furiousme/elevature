'use client';

import { MouseEvent, useState } from 'react';
import { Answers } from 'app/types';
import Dropdown from 'components/dropdown';
import { industries } from 'models/options';
import { steps } from 'models/steps';
import FormWrapper from 'components/form-wrapper';

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
    <FormWrapper disabled={!jobTitle || !industry} submitHandler={handleSubmit}>
      <div className='mb-10'>
        <label className='mb-4 block'>
          <span className='text-accent'>1. </span>What is your current job title or primary role?
        </label>
        <input
          type='text'
          placeholder='e.g., Software Developer...'
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)} // add validation
          className='w-full rounded-md border border-inactive bg-background px-4 py-2.5 text-lg outline-accent'
        />
      </div>

      <p className='mb-4'>
        <span className='text-accent'>2. </span>Which industry do you currently work in or are most
        interested in?
      </p>
      <Dropdown
        label='Select industry'
        options={industries}
        selected={industry}
        saveSelected={setIndustry}
      />
    </FormWrapper>
  );
};

export default Step1Form;
