import { useState } from 'react';

import { ArrowDown } from './icons/arrow-down';

type Props = {
  label: string;
  options: string[];
  selected: string;
  saveSelected: (option: string) => void;
};

const Dropdown = ({ label, options, selected, saveSelected }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const baseMenuClasses =
    'absolute z-[1000] block max-h-60 w-max min-w-full overflow-auto rounded bg-background py-2 shadow-xl';
  const menuClasses = isOpen ? `${baseMenuClasses} block` : `${baseMenuClasses} hidden`;

  const toggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    saveSelected(option);
    setIsOpen(false);
  };

  return (
    <div className='relative mx-auto w-full rounded-lg'>
      <button
        type='button'
        className='w-full border-b border-accent bg-background px-5 py-2.5 text-sm font-semibold outline-none'
        onClick={toggle}
      >
        {selected || label}
        <ArrowDown />
      </button>

      <ul className={menuClasses}>
        {options.map((el) => {
          return (
            <li
              key={el}
              className='hover cursor-pointer bg-background px-5 py-2.5 text-sm'
              onClick={() => handleSelect(el)}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
