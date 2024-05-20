import Image from "next/image";
import React from "react";

const variants = {
    boble1: "/bobles-img/boble-1.svg",
    boble2: "/bobles-img/boble-2.svg",
    boble3: "/bobles-img/boble-3.svg",
    boble4: "/bobles-img/boble-4.svg",
    boble5: "/bobles-img/boble-5.svg",
};

type Props = { variant?: keyof typeof variants; className?: string };

const Boble = ({ variant = "boble1", className }: Props) => {
    return (
        <div className={`absolute ${className}`}>
            <Image
                src={variants[variant]}
                alt="boble-img"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
};

export default Boble;
