"use client";

import { useRef, useState } from "react";

const variants = {
    default:
        "flex items-center justify-center rounded-[20px] bg-main-color-light text-gray-dark ",
    outline:
        "flex items-center justify-center rounded-[20px] border border-[4px] border-main-color-light bg-none text-gray-dark",
    accent: "flex items-center justify-center rounded-[20px] bg-cherry-pink text-gray-dark",
    danger: "flex items-center justify-center rounded-[20px] bg-red-600 text-white",
};

const sizes = {
    sm: "h-8 px-4",
    lg: "h-14 px-12 text-[20px]",
    xl: "h-20 px-8 text-2xl",
};

const fontStyles = {
    default: "font-medium",
    semibold: "font-semibold",
    regular: "font-normal",
};

type Props = {
    children?: React.ReactNode;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    fontStyle?: keyof typeof fontStyles;
    center?: boolean;
    className?: string;
    hoverEffect?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    variant = "default",
    size = "sm",
    fontStyle = "default",
    center = false,
    hoverEffect = true,
    className,
    ...props
}: Props) => {
    const handleCursorShadow = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!hoverEffect) {
            return;
        }
        const node = e.target as HTMLElement;
        const bounds = node.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        node.style.transition = "";
        node.style.boxShadow = `${(node.offsetWidth / 2 - x) * 0.15}px ${(node.offsetHeight / 2 - y) * 0.35}px 10px rgba(134, 206, 235, 0.815)`;
    };

    const clearShadow = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!hoverEffect) {
            return;
        }
        const node = e.target as HTMLElement;
        node.style.transition = "0.3s all";
        node.style.boxShadow = "0 0 10px rgba(209, 186, 124, 0.815)";
    };

    return (
        <button
            {...props}
            className={`${variants[variant]} ${sizes[size]} ${fontStyles[fontStyle]} ${center ? "mx-auto" : ""} [&>*]:pointer-events-none ${className}`}
            onMouseMove={handleCursorShadow}
            onMouseOut={clearShadow}
        >
            {children}
        </button>
    );
};

export default Button;
