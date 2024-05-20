type Props = {
    fill?: string;
};

const LogoIcon = ({ fill = "#565B86" }: Props) => {
    return (
        <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="30.5" stroke={fill} strokeWidth="3" />
            <path d="M16 13L22 19V44L16 50V13Z" fill={fill} />
            <path d="M30 20L36 8.5V19V44L30 50V20Z" fill={fill} />
            <path
                d="M5 22.2427H13.4853L31.163 39.9203V48.4056L5 22.2427Z"
                fill={fill}
            />
            <path
                d="M57.4056 22.2427H48.9203L31.2426 39.9203V48.4056L57.4056 22.2427Z"
                fill={fill}
            />
            <path d="M48 13L42 19V44L48 50V13Z" fill={fill} />
        </svg>
    );
};

export default LogoIcon;
