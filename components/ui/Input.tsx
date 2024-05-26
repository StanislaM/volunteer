import React from "react";

const variants = {
    default:
        "h-[54px] w-full border-main-color rounded-[17px] border-[5px] px-4 placeholder:opacity-75 text-gray-dark font-medium text-[20px] outline-none",
};

type Props = {
    variant?: keyof typeof variants;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ variant = "default", className, ...props }: Props) => {
    return (
        <input className={`${variants[variant]} ${className} `} {...props} />
    );
};

export default Input;
