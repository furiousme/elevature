import { Fragment, MouseEvent, useState } from 'react';

import { Answers, SkillLevel } from 'app/types';
import { skillLevels } from 'models/options';
import { steps } from 'models/steps';
import FormWrapper from 'components/form-wrapper';

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { currentSkills, skillLevel }: Answers['skills']) => void;
};

const Step2Form = ({ goToStep, passAnswers }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 2));
  const [skills, setSkills] = useState('');
  const [skillLevel, setSkillLevel] = useState(SkillLevel.BEGINNER);

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!skills) return;
    passAnswers('skills', { currentSkills: skills, skillLevel });
    goToStep(step.order + 1);
  };

  return (
    <FormWrapper disabled={!skills} submitHandler={handleSubmit}>
      <div className='mb-10'>
        <label className='mb-4 block'>
          <span className='text-accent'>1. </span>
          List up to 5 key skills you currently have that are relevant to your career or interests.
        </label>
        <textarea
          placeholder='e.g., data analysis...'
          value={skills}
          onChange={(e) => setSkills(e.target.value)} // add validation
          className='block w-full max-w-lg rounded border border-inactive bg-background p-4 text-sm outline-accent'
          rows={3}
        />
      </div>

      <p className='mb-4'>
        <span className='text-accent'>2. </span>How would you rate your overall proficiency in your
        primary skills?
      </p>
      <div>
        {Object.entries(skillLevels).map(([level, description]) => {
          return (
            <Fragment key={level}>
              <div className='mb-4 flex items-center'>
                <label className='flex items-center text-sm'>
                  <input
                    type='radio'
                    className='size-5'
                    checked={skillLevel === level}
                    name='skillLevel'
                    onChange={() => setSkillLevel(level as SkillLevel)}
                  />
                  <span className='ml-4 inline-block'>{description}</span>
                </label>
              </div>
            </Fragment>
          );
        })}
      </div>
    </FormWrapper>
  );
};

export default Step2Form;
