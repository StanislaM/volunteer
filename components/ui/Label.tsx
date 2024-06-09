import React from "react";

const variants = {
    default: "pl-4 mb-2 text-[30px] leading-[36px] font-light text-gray-dark",
};

type Props = {
    variant?: keyof typeof variants;
    children: React.ReactNode;
    className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ variant = "default", children, className }: Props) => {
    return (
        <label className={`${variants[variant]} ${className}`}>
            {children}
        </label>
    );
};

export default Label;
