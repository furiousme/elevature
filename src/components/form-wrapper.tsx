import { PropsWithChildren } from 'react';
import ArrowRight from './icons/arrow-right';
import config from '../../tailwind.config';
import { MouseEvent } from 'react';

const colors = config.theme.extend.colors;

type Props = {
  disabled: boolean;
  buttonText?: string;
  withIcon?: boolean;
  submitHandler: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FormWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  disabled,
  buttonText = 'Next',
  withIcon = true,
  submitHandler,
}) => {
  return (
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        {children}
      </div>
      <button
        className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
        disabled={disabled}
        onClick={submitHandler}
      >
        {buttonText}
        {withIcon && <ArrowRight color={colors.accent} />}
      </button>
    </form>
  );
};

export default FormWrapper;
