import type { SelectHTMLAttributes } from 'react';

type Props<T extends string = string> = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    name: string;
    options: { label: string; value: T }[];
    onChange?: (value: T) => void;
    containerClassName?: string;
};

const AppSelect = <T extends string = string>(props: Props<T>) => {  
    const { label, name,options, onChange, value, id, containerClassName = '', ...selectProps } = props;
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const selectName = name ?? label.toLowerCase().replace(/\s+/g, '-');
    
    return (
        <div className={`custom-select ${containerClassName}`}>
            <label htmlFor={selectId} className="sr-only">{label}</label>
            <select
                id={selectId}
                name={selectName}
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