type THeading = {
    children?: React.ReactNode;
    className?: string;
};

type THeadingElement = ({ children, className }: THeading) => JSX.Element;

const H1: THeadingElement = ({ children, className }: THeading) => {
    return (
        <h1
            className={`text-[96px] font-semibold leading-[120px] ${className}`}
        >
            {children}
        </h1>
    );
};

const H2: THeadingElement = ({ children, className }: THeading) => {
    return (
        <h2 className={`text-[64px] font-semibold leading-[72px] ${className}`}>
            {children}
        </h2>
    );
};

const H3: THeadingElement = ({ children, className }: THeading) => {
    return (
        <h3 className={`text-[24px] font-normal leading-[30px] ${className}`}>
            {children}
        </h3>
    );
};

const headings = {
    h1: H1,
    h2: H2,
    h3: H3,
};

type Props = { type: keyof typeof headings } & THeading;

const H = ({ type, children, className }: Props) => {
    const Heading = headings[type];

    return <Heading className={className}>{children}</Heading>;
};

export default H;
