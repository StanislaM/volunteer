const sizes = {
    lg: {
        w: 35,
        h: 35,
    },
    sm: {
        w: 16,
        h: 14,
    },
};

type Props = {
    fill?: string;
    size?: keyof typeof sizes;
};

const TelegramIcon = ({ fill = "#039BE5", size = "sm" }: Props) => {
    return (
        <svg
            width={sizes[size].w}
            height={sizes[size].h}
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.88574 8.23838L5.63761 11.7284C5.99261 11.7284 6.14636 11.5759 6.33074 11.3928L7.99511 9.80213L11.4439 12.3278C12.0764 12.6803 12.522 12.4946 12.6926 11.7459L14.9564 1.13838L14.957 1.13775C15.1576 0.202753 14.6189 -0.162872 14.0026 0.0665034L0.696361 5.16088C-0.211764 5.51338 -0.198014 6.01963 0.541986 6.249L3.94386 7.30713L11.8457 2.36275C12.2176 2.1165 12.5557 2.25275 12.2776 2.499L5.88574 8.23838Z"
                fill={fill}
            />
        </svg>
    );
};

export default TelegramIcon;
