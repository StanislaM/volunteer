"use client";

const variants = {
    default:
        "flex items-center justify-center rounded-[20px] bg-main-color-light text-gray-dark",
    outline:
        "flex items-center justify-center rounded-[20px] border border-[4px] border-main-color-light bg-none text-gray-dark",
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
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    variant = "default",
    size = "sm",
    fontStyle = "default",
    center = false,
    className,
    ...props
}: Props) => {
    return (
        <button
            {...props}
            className={`${variants[variant]} ${sizes[size]} ${fontStyles[fontStyle]} ${center ? "mx-auto" : ""} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
