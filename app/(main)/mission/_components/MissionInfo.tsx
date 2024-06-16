"use client";

import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import ParticipantsIcon from "@/components/icons/ParticipantsIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";
import { IMissionFullInfo } from "@/shared/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = { id: string } & IMissionFullInfo;

const MissionInfo = ({
    id,
    name,
    description,
    location,
    date,
    participantsCount,
    volunteer,
    activities,
    status,
}: Props) => {
    const router = useRouter();
    const [isAcquiring, setIsAcquiring] = useState(false);

    const participate = () => {
        setIsAcquiring(true);

        axios
            .post(`/api/event/${id}/participate`)
            .then(() => router.push("/account/active-missions"))
            .catch(() => router.push("/login"))
            .finally(() => setIsAcquiring(false));
    };

    return (
        <div>
            <H type="h2">{name}</H>
            <Separator />

            <div className="flex justify-between">
                <div>
                    <p className="text-xl">Опис: {description}</p>

                    <div className="mt-4">
                        <span className="text-xl font-light">Категорії:</span>
                        {activities.map((activity) => (
                            <div
                                className="mt-1 pl-3 font-medium"
                                key={activity.id}
                            >
                                {activity.name}
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 border-t-2 pt-1">
                        Організатор: {volunteer.organizationName}
                    </div>
                </div>

                <div className="flex h-min w-[350px] flex-col gap-y-2 border-l-2 pl-2">
                    <div className="flex flex-wrap items-center gap-x-2">
                        <LocationIcon />
                        Місце проведення:
                        <span className="ml-1 font-medium">{location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2">
                        <ClockIcon />
                        Дата початку:
                        <span className="ml-1 font-medium">
                            {new Date(date).toLocaleDateString("uk-UA", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2">
                        <ParticipantsIcon />
                        Учасники:
                        <span className="ml-1 font-medium">
                            {participantsCount}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2">
                        Статус місії:
                        <span className="ml-1 font-medium">{status}</span>
                    </div>
                </div>
            </div>

            <Button size="lg" className="mt-10" onClick={participate}>
                {isAcquiring ? <SpinnerIcon /> : "Долучитись"}
            </Button>
        </div>
    );
};

export default MissionInfo;
