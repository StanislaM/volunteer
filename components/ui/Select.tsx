"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

const variants = {
    default: {
        borderColor: "border-main-color",
        listOffset: "top-14",
    },
    white: {
        borderColor: "unset",
        listOffset: "top-11",
    },
};

type Props = {
    className?: string;
    options: Readonly<string[]>;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    variant?: keyof typeof variants;
    disabled?: boolean;
    error?: string;
};

const Select = ({
    className,
    options,
    placeholder = "",
    value,
    setValue,
    variant = "default",
    disabled = false,
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
    }, [value, options]);

    return (
        <div className={`relative ${className}`}>
            <Input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                error={error}
                variant={variant}
                disabled={disabled}
            />

            <div
                className={`absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-transform ${!isCollapsed && "rotate-180"} ${disabled && "opacity-0"}`}
                role="button"
                onClick={() => {
                    if (!disabled) setIsCollapsed((state) => !state);
                }}
            >
                <ArrowDownIcon />
            </div>

            <div
                className={`absolute ${variants[variant].listOffset} z-50 flex  ${isCollapsed ? "max-h-[0px] border-0 py-0 " : "max-h-[120px] border-[5px] py-2"} scrollbar-custom w-full flex-col gap-y-3 overflow-y-scroll rounded-[17px]  ${variants[variant].borderColor} bg-white transition-all`}
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
