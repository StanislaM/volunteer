"useClient";

import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    title: string;
    Icon: JSX.Element;
    active?: boolean;
    link: string;
};

const SidebarItem = ({ title, Icon, link, active = false }: Props) => {
    const router = useRouter();

    const navigate = () => {
        router.push(link);
    };

    return (
        <div
            className="flex h-[43px] w-full cursor-pointer items-center justify-between rounded-[10px] px-4 py-3 hover:bg-gray-light"
            onClick={navigate}
        >
            <div className="flex items-center">
                {Icon}
                <span className="ml-2 text-[16px] font-semibold text-gray-dark ">
                    {title}
                </span>
            </div>
        </div>
    );
};

export default SidebarItem;
