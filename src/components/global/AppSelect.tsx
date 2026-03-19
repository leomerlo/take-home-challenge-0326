import type { SelectHTMLAttributes } from 'react';

type Props<T extends string = string> = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: { label: string; value: T }[];
    onChange?: (value: T) => void;
};

const AppSelect = <T extends string = string>(props: Props<T>) => {  
    const { label, options, onChange, value, id, ...selectProps } = props;
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    
    return (
        <div className="custom-select">
            <label htmlFor={label} className="sr-only">{label}</label>
            <select
                id={selectId}
                className="bg-transparent outline-none appearance-none pl-[12px] pr-[32px]"
                value={value ?? ''}
                onChange={onChange}
                {...selectProps}
                >
                {options.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AppSelect;