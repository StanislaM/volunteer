"use client";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { RootState } from "@/lib/store";
import { staticData } from "@/shared/staticData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type Props = {};

const Nav = (props: Props) => {
    const router = useRouter();
    const { status } = useSelector((state: RootState) => state.user);

    const handleJoin = () => {
        if (status === "unauthorized") {
            router.push("/login");
        } else {
            router.push("/account");
        }
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

                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleJoin}
                        disabled={status === "authorizating"}
                    >
                        {status === "authorized" ? (
                            "Кабінет"
                        ) : status === "authorizating" ? (
                            <SpinnerIcon spin size="sm" />
                        ) : (
                            "Приєднатись"
                        )}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
