import React from "react";

const variants = {
    default:
        "min-h-[54px] w-full border-main-color rounded-[17px] border-[5px] px-4 placeholder:opacity-75 text-gray-dark font-medium text-[20px] outline-none relative",
    white: "min-h-[76px] w-full disabled:border-none enabled:border-2 rounded-[10px] outline-none bg-white py-2 px-4 text-xl font-medium placeholder:opacity-75 text-gray-dark relative",
};

type Props = {
    variant?: keyof typeof variants;
    className?: string;
    error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
    variant = "default",
    className = "",
    error = "",
    ...props
}: Props) => {
    return (
        <textarea
            className={`${variants[variant]} ${error && "border-red-400"} ${className}`}
            {...props}
        />
    );
};

export default Textarea;
