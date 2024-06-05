import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import React from "react";
import SidebarItem from "./SidebarItem";
import MeIcon from "@/components/icons/MeIcon";
import ClipIcon from "@/components/icons/ClipIcon";
import CompleteIcon from "@/components/icons/CompleteIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import Profile from "./Profile";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <aside className="h-full w-[355px] border-r-2 border-r-gray-semi-light border-opacity-40">
            <div className="flex h-full flex-col justify-between pb-5 pl-7 pr-5 pt-8">
                <div>
                    <Logo />

                    <div className="mt-20">
                        <Button
                            size="lg"
                            className="h-[67px] w-full px-3 text-[22px] font-bold"
                        >
                            <PlusIcon />
                            <span className="ml-1">Створити нову місію</span>
                        </Button>

                        <div className="mt-8 flex flex-col gap-y-6">
                            <SidebarItem
                                title="Мої місії"
                                Icon={<MeIcon />}
                                key={1}
                                link="/account/my-missions"
                            />

                            <SidebarItem
                                title="Активні місії"
                                Icon={<ClipIcon />}
                                key={2}
                                link="/account/active-missions"
                            />

                            <SidebarItem
                                title="Виконані місії"
                                Icon={<CompleteIcon />}
                                key={3}
                                link="/account/completed-missions"
                            />
                        </div>
                    </div>
                </div>

                <Profile />
            </div>
        </aside>
    );
};

export default Sidebar;
