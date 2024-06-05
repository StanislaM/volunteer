import React from "react";

const variants = {
    default:
        "h-[54px] w-full border-main-color rounded-[17px] border-[5px] px-4 placeholder:opacity-75 text-gray-dark font-medium text-[20px] outline-none",
    white: "h-[45px] w-full disabled:border-none enabled:border-2 rounded-[10px] outline-none bg-white py-2 px-4 text-2xl font-medium placeholder:opacity-75 text-gray-dark",
};

type Props = {
    variant?: keyof typeof variants;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ variant = "default", className, ...props }: Props) => {
    return (
        <input className={`${variants[variant]} ${className}  `} {...props} />
    );
};

export default Input;
