import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  containerClassName?: string;
};

const AppInput = (props: Props) => {
  const { label, icon, containerClassName = '', id, ...inputProps } = props;
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      className={`bg-(--bg-input) border border-(--border-default) rounded-md px-(--sp-2) py-(--sp-1) text-(--text-primary) text-xs flex gap-2 items-center focus-within:border-(--augur-blue) focus-within:shadow-(--shadow-input) ${containerClassName}`}
    >
      {icon ? (
        <label htmlFor={inputId} className="cursor-pointer shrink-0" aria-label={label}>
          {icon}
        </label>
      ) : (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        className="bg-transparent outline-none w-full"
        {...inputProps}
      />
    </div>
  );
};

export default AppInput;