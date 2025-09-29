const sizes = {
    sm: 14,
    lg: 31,
};

type Props = {
    fill?: string | "currentColor";
    size?: keyof typeof sizes;
    strokeWidth?: number;
};

const XMarkIcon = ({
    fill = "currentColor",
    size = "sm",
    strokeWidth = 1.5,
}: Props) => {
    return (
        <svg
            width={sizes[size]}
            height={sizes[size]}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 13L13 1M1 1L13 13"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default XMarkIcon;
