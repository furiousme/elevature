'use client';

import { Fragment } from 'react';

import config from '../../tailwind.config';

import { steps } from 'models/steps';

const { colors } = config.theme.extend;

type Props = {
  activeStepOrder: number;
  goToStep: (stepNumber: number) => void;
};

export const StepsProgressBar = ({ activeStepOrder, goToStep }: Props) => {
  const baseBtnClasses = 'flex-none basis-20 rounded-full border-[3px] p-5';
  const activeBtnClasses = baseBtnClasses + '  bg-background border-accent hover';
  const currentBtnClasses = baseBtnClasses + ' bg-accent border-accent hover';
  const inactiveBtnClasses = baseBtnClasses + ' bg-background border-inactive';

  const getDividerClasses = (order: number) => {
    return 'h-1 grow ' + (order < activeStepOrder - 1 ? 'bg-accent' : 'bg-inactive');
  };

  return (
    <div className='progress-lines container flex max-w-4xl items-center justify-between'>
      {steps.map((el) => {
        const Icon = el.Icon;
        const isLast = el.order === steps.length;
        const isPassed = activeStepOrder > el.order;
        const isCurrent = activeStepOrder === el.order;
        const iconColor = isCurrent ? '#FFFFFF' : isPassed ? colors.accent : colors.inactive;
        const btnClasses = isPassed
          ? activeBtnClasses
          : isCurrent
            ? currentBtnClasses
            : inactiveBtnClasses;

        return (
          <Fragment key={el.order}>
            <button
              className={btnClasses}
              disabled={!(isPassed || isCurrent)}
              onClick={() => goToStep(el.order)}
            >
              <Icon color={iconColor} />
            </button>
            {!isLast && <div className={getDividerClasses(el.order)} />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepsProgressBar;
