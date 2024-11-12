import { Fragment, MouseEvent, useState } from 'react';

import config from '../../../tailwind.config';

import { Answers, SkillLevel } from 'app/types';
import ArrowRight from 'components/icons/arrow-right';
import { skillLevels } from 'models/options';
import { steps } from 'models/steps';

const colors = config.theme.extend.colors;

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
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        <div className='mb-10'>
          <label className='mb-4 block'>
            List up to 5 key skills you currently have that are relevant to your career or
            interests.
          </label>
          <textarea
            placeholder='e.g., data analysis, project management, JavaScript...'
            value={skills}
            onChange={(e) => setSkills(e.target.value)} // add validation
            className='block w-full max-w-lg rounded border border-inactive bg-background p-4 text-sm outline-accent'
            rows={3}
          />
        </div>

        <p className='mb-4'>How would you rate your overall proficiency in your primary skills?</p>

        <div>
          {Object.entries(skillLevels).map(([level, description], ind) => {
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
      </div>
      <button
        className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
        disabled={!skills}
        onClick={handleSubmit}
      >
        Next
        <ArrowRight color={colors.accent} />
      </button>
    </form>
  );
};

export default Step2Form;
