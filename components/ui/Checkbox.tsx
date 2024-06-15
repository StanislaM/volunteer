"use client";

import { useEffect } from "react";

const variants = {
    default: {
        circle: "h-4 w-4 cursor-pointer rounded-full transition-colors duration-300",
        checked: "bg-main-color-light",
        unChecked: "bg-white",
    },
};

type Props = {
    className?: string;
    title: string;
    variant?: keyof typeof variants;
    isChecked: boolean;
    border?: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    customCheck?: (() => void) | null;
};

const Checkbox = ({
    title,
    isChecked,
    setIsChecked,
    customCheck = null,
    variant = "default",
    border = false,
    className = "",
}: Props) => {
    return (
        <div className={`flex items-center gap-x-2  ${className}`}>
            <div
                role="button"
                className={`${variants[variant].circle} ${border && !isChecked ? "border" : ""} ${isChecked ? variants[variant].checked : variants[variant].unChecked}`}
                onClick={() =>
                    (customCheck && customCheck()) ||
                    setIsChecked((state) => !state)
                }
            />
            <span>{title}</span>
        </div>
    );
};

export default Checkbox;
