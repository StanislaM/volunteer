type Props = {
    fill?: string;
};

const LocationIcon = ({ fill = "#626367" }: Props) => {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.875 8.3125C11.875 8.94239 11.6248 9.54648 11.1794 9.99188C10.734 10.4373 10.1299 10.6875 9.5 10.6875C8.87011 10.6875 8.26602 10.4373 7.82062 9.99188C7.37522 9.54648 7.125 8.94239 7.125 8.3125C7.125 7.68261 7.37522 7.07852 7.82062 6.63312C8.26602 6.18772 8.87011 5.9375 9.5 5.9375C10.1299 5.9375 10.734 6.18772 11.1794 6.63312C11.6248 7.07852 11.875 7.68261 11.875 8.3125Z"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.4375 8.3125C15.4375 13.9666 9.5 17.2188 9.5 17.2188C9.5 17.2188 3.5625 13.9666 3.5625 8.3125C3.5625 6.73778 4.18806 5.22755 5.30155 4.11405C6.41505 3.00056 7.92528 2.375 9.5 2.375C11.0747 2.375 12.5849 3.00056 13.6984 4.11405C14.8119 5.22755 15.4375 6.73778 15.4375 8.3125Z"
                stroke={fill}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default LocationIcon;
