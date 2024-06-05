type Props = {
    fill?: string;
};

const PlusIcon = ({ fill = "#3F3F3F" }: Props) => {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.5 2V19M19 10.5H2"
                stroke={fill}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PlusIcon;
