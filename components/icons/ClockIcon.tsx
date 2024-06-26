type Props = {
    fill?: string;
};

const ClockIcon = ({ fill = "#626367" }: Props) => {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.5 4.75V9.5H13.0625M16.625 9.5C16.625 10.4357 16.4407 11.3622 16.0826 12.2266C15.7246 13.0911 15.1998 13.8765 14.5381 14.5381C13.8765 15.1998 13.0911 15.7246 12.2266 16.0826C11.3622 16.4407 10.4357 16.625 9.5 16.625C8.56433 16.625 7.63783 16.4407 6.77338 16.0826C5.90894 15.7246 5.12348 15.1998 4.46186 14.5381C3.80025 13.8765 3.27542 13.0911 2.91736 12.2266C2.55929 11.3622 2.375 10.4357 2.375 9.5C2.375 7.61033 3.12567 5.79806 4.46186 4.46186C5.79806 3.12567 7.61033 2.375 9.5 2.375C11.3897 2.375 13.2019 3.12567 14.5381 4.46186C15.8743 5.79806 16.625 7.61033 16.625 9.5Z"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ClockIcon;
