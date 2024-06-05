const sizes = {
    lg: 29,
    sm: 20,
};

type Props = {
    spin?: boolean;
    fill?: string;
    size?: keyof typeof sizes;
};

const SpinnerIcon = ({ fill = "#3F3F3F", spin = true, size = "lg" }: Props) => {
    return (
        <svg
            className={`${spin ? "animate-spin" : ""}`}
            width={sizes[size]}
            height={sizes[size]}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.125 1V4.28125M23.4058 4.84417L21.0856 7.16438M27.25 14.125H23.9688M23.4058 23.4058L21.0856 21.0856M14.125 23.9688V27.25M7.16438 21.0856L4.84417 23.4058M4.28125 14.125H1M7.16438 7.16438L4.84417 4.84417"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SpinnerIcon;
