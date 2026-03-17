type Props<T extends string = string> = {
    label: string;
    value: T;
    onChange: (value: T) => void;
    options: { label: string; value: T }[];
};

const AppSelect = <T extends string = string>(props: Props<T>) => {
    return (
        <div className="custom-select">
            <label htmlFor={props.label} className="sr-only">{props.label}</label>
            <select
                id={props.label}
                className="bg-transparent outline-none appearance-none pl-[12px] pr-[32px]"
                value={props.value ?? ''}
                onChange={(e) => props.onChange(e.target.value as T)}
                >
                {props.options.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AppSelect;