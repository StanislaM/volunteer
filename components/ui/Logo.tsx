"use client";

import { staticData } from "@/shared/staticData";
import LogoIcon from "../icons/LogoIcon";
import { useRouter } from "next/navigation";

type Props = {
    isLink?: boolean;
    color?: "dark" | "light";
    variant?: "default" | "with-watermark";
};

const Logo = ({
    isLink = true,
    color = "dark",
    variant = "default",
}: Props) => {
    const router = useRouter();

    const handleClick = () => {
        if (isLink) {
            router.push("/");
        }
    };

    return (
        <div
            className={`flex items-center justify-center gap-x-1 ${isLink ? "cursor-pointer" : ""}`}
            role={isLink ? "link" : ""}
            onClick={handleClick}
        >
            <LogoIcon
                fill={`${color === "dark" ? "#565B86" : color === "light" ? "white" : ""}`}
            />
            <span
                className={`ml-1 mt-1 flex flex-col font-inter text-2xl font-medium tracking-[6px] ${color === "dark" ? "text-logo-violet" : color === "light" ? "text-white" : ""}`}
            >
                {staticData.platformName.toUpperCase()}

                {variant === "with-watermark" && (
                    <span
                        className={`text-[16px] font-extralight tracking-normal ${color === "dark" ? "text-logo-violet" : color === "light" ? "text-white" : ""}`}
                    >
                        © 2024 ЧНТУ
                    </span>
                )}
            </span>
        </div>
    );
};

export default Logo;
