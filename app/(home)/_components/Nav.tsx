"use client";

import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { staticData } from "@/shared/staticData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const Nav = (props: Props) => {
    const router = useRouter();

    const handleJoin = () => {
        router.push("/login");
    };

    return (
        <nav>
            <div className="fixed left-1/2 top-4 z-[10000] flex h-[85px] w-[1200px] -translate-x-1/2 items-center justify-between rounded-[20px] bg-main-color px-11 shadow-default">
                <Logo />

                <div className="flex items-center justify-center gap-x-4">
                    <ul className="flex items-center justify-center gap-x-6 font-normal">
                        {staticData.navLinks.map((link, i) => (
                            <li key={i}>
                                <Link href={link.href}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <Button variant="default" size="sm" onClick={handleJoin}>
                        Приєднатися
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
