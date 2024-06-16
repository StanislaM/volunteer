"use client";

import Checkbox from "./Checkbox";

type Props = {
    options: { id: number; value: string }[];
    selectedValues: number[];
    setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
    border?: boolean;
    className?: string;
};

const GroupCheckbox = ({
    options,
    selectedValues,
    setSelectedValues,
    border = false,
    className = "",
}: Props) => {
    const handleCheck = (value: number) => {
        if (selectedValues.indexOf(value) !== -1) {
            setSelectedValues(selectedValues.filter((item) => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    return (
        <div className={`flex flex-col ${className}`}>
            {options.map((option) => (
                <Checkbox
                    key={option.id}
                    title={option.value}
                    isChecked={selectedValues.indexOf(option.id) !== -1}
                    setIsChecked={() => handleCheck(option.id)}
                    border={border}
                />
            ))}
        </div>
    );
};

export default GroupCheckbox;
