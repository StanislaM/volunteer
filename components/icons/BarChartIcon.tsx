import React from "react";

type Props = {
    className?: string;
    size?: number;
};

const BarChartIcon = ({ className = "", size = 20 }: Props) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3 17V21H7V17H3ZM9.5 8V21H13.5V8H9.5ZM16 13V21H20V13H16ZM2 3V5H22V3H2Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default BarChartIcon;
