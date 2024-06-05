type Props = {
    fill?: string;
};

const MeIcon = ({ fill = "#3F3F3F" }: Props) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.982 16.725C15.2833 15.7999 14.3793 15.0496 13.3412 14.5334C12.3031 14.0171 11.1594 13.749 10 13.75C8.84066 13.749 7.6969 14.0171 6.65883 14.5334C5.62077 15.0496 4.71675 15.7999 4.01801 16.725M15.982 16.725C17.3455 15.5122 18.3071 13.9136 18.7412 12.1411C19.1753 10.3686 19.0603 8.5061 18.4115 6.80049C17.7627 5.09488 16.6107 3.62679 15.1084 2.59091C13.6061 1.55503 11.8244 1.00031 9.99951 1.00031C8.17467 1.00031 6.39295 1.55503 4.89062 2.59091C3.38829 3.62679 2.23634 5.09488 1.58755 6.80049C0.938753 8.5061 0.823765 10.3686 1.25783 12.1411C1.6919 13.9136 2.65451 15.5122 4.01801 16.725M15.982 16.725C14.336 18.1932 12.2056 19.0032 10 19C7.79404 19.0034 5.66425 18.1934 4.01801 16.725M13 7.75001C13 8.54566 12.6839 9.30872 12.1213 9.87133C11.5587 10.4339 10.7957 10.75 10 10.75C9.20436 10.75 8.4413 10.4339 7.87869 9.87133C7.31608 9.30872 7.00001 8.54566 7.00001 7.75001C7.00001 6.95436 7.31608 6.1913 7.87869 5.62869C8.4413 5.06608 9.20436 4.75001 10 4.75001C10.7957 4.75001 11.5587 5.06608 12.1213 5.62869C12.6839 6.1913 13 6.95436 13 7.75001Z"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MeIcon;
