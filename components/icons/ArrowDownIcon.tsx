type Props = {
    fill?: string;
};

const ArrowDownIcon = ({ fill = "#3F3F3F" }: Props) => {
    return (
        <svg
            width="17"
            height="10"
            viewBox="0 0 17 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 1L8.5 8.5L1 1"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowDownIcon;
