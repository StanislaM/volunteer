type Props = {
    fill?: string;
};

const ConfirmIcon = ({ fill = "#626367" }: Props) => {
    return (
        <svg
            width="16"
            height="15"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 8.5L7 14.5L16 1"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ConfirmIcon;
