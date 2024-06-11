"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

type Props = {
    className?: string;
    options: Readonly<string[]>;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    error?: string;
};

const Select = ({
    className,
    options,
    placeholder = "",
    value,
    setValue,
    error = "",
}: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        setFilteredOptions(() =>
            options.filter((option) => value === "" || option.includes(value)),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={`relative ${className}`}>
            <Input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                error={error}
            />

            <div
                className={`absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-transform ${!isCollapsed && "rotate-180"}`}
                role="button"
                onClick={() => setIsCollapsed((state) => !state)}
            >
                <ArrowDownIcon />
            </div>

            <div
                className={`absolute top-14 z-50 flex  ${isCollapsed ? "max-h-[0px] border-0 py-0 " : "max-h-[120px] border-[5px] py-2"} scrollbar-custom w-full flex-col gap-y-3 overflow-y-scroll rounded-[17px]  border-main-color bg-white transition-all`}
            >
                {filteredOptions.length === 0 ? (
                    <div className="cursor-pointer rounded-lg px-4">
                        Нічого не знайдено
                    </div>
                ) : (
                    filteredOptions.map((option, i) => (
                        <div
                            className="cursor-pointer rounded-lg px-4 hover:bg-gray-light"
                            key={i}
                            onClick={() => {
                                setValue(option);
                                setIsCollapsed(true);
                            }}
                        >
                            {option}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Select;
