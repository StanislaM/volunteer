"use client";

import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import MeIcon from "@/components/icons/MeIcon";
import ClipIcon from "@/components/icons/ClipIcon";
import CompleteIcon from "@/components/icons/CompleteIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import NoVolunteerModal from "@/components/modals/NoVolunteerModal";
import GetVolunteerRoleRequestModal from "@/components/modals/GetVolunteerRoleRequestModal";
import { useRouter } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
    const router = useRouter();
    const { volunteer } = useSelector((state: RootState) => state.user);
    const [showNoVolunteerModal, setShowNoVolunteerModal] = useState(false);
    const [showRequestVolunteerModal, setShowRequestVolunteerModal] =
        useState(false);

    const createNewMission = () => {
        if (volunteer === null || (volunteer && !volunteer.validated)) {
            setShowNoVolunteerModal(true);
        }

        if (volunteer?.validated) {
            router.push("/account/create-mission");
        }
    };

    return (
        <aside className="h-full w-[280px] border-r-2 border-r-gray-semi-light border-opacity-40">
            <NoVolunteerModal
                isOpen={showNoVolunteerModal}
                setIsOpen={setShowNoVolunteerModal}
                isRequestFormOpen={showRequestVolunteerModal}
                setIsRequestFormOpen={setShowRequestVolunteerModal}
                volunteerData={volunteer}
            />
            <GetVolunteerRoleRequestModal
                isOpen={showRequestVolunteerModal}
                setIsOpen={setShowRequestVolunteerModal}
            />

            <div className="flex h-full flex-col justify-between pb-5 pl-4 pr-3 pt-8">
                <div>
                    <Logo />

                    <div className="mt-20">
                        <Button
                            size="sm"
                            className="h-[47px] w-full px-3 text-[16px] font-bold "
                            onClick={() => createNewMission()}
                        >
                            <PlusIcon />
                            <span className="ml-1">Створити нову місію</span>
                        </Button>

                        <div className="mt-8 flex flex-col gap-y-4">
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
