"use client";

import { ITmpMissionData } from "@/app/(home)/_sections/Missions";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import ParticipantsIcon from "@/components/icons/ParticipantsIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";
import { RootState } from "@/lib/store";
import {
    IMissionCard,
    IMissionFullInfo,
    IPreviousEvents,
} from "@/shared/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
    const { volunteer: userVolunteer } = useSelector(
        (state: RootState) => state.user,
    );
    const router = useRouter();
    const [isAcquiring, setIsAcquiring] = useState(false);
    const createNextMission = () => {
        router.push(`/account/create-mission?prevId=${id}`);
    };
    const [prevEvents, setPrevEvents] = useState<IMissionCard[]>([]);

    const participate = () => {
        setIsAcquiring(true);

        axios
            .post(`/api/event/${id}/participate`)
            .then(() => router.push("/account/active-missions"))
            .catch(() => router.push("/login"))
            .finally(() => setIsAcquiring(false));
    };

    useEffect(() => {
        axios
            .get(
                `https://volunteer.stu.cn.ua/api/event/${id}/previous-events`,
                {
                    withCredentials: true,
                },
            )
            .then((res) =>
                setPrevEvents(
                    res.data.map((mission: ITmpMissionData): IMissionCard => {
                        return {
                            id: mission.id.toString(),
                            title: mission.name,
                            descr: mission.description,
                            host: {
                                name: "Іван Д.",
                                img: "",
                            },
                            info: {
                                date: new Date(mission.date).toLocaleDateString(
                                    "uk-UA",
                                    {
                                        month: "long",
                                        day: "numeric",
                                    },
                                ),
                                location: mission.location,
                                participants: mission.participantsCount,
                            },
                            volunteer: mission.volunteer,
                            missionStatus: mission.status,
                        };
                    }),
                ),
            )
            .catch((res) => console.log(res));
    }, []);

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

            <div className="mt-10 flex gap-x-8">
                <Button size="lg" className="" onClick={participate}>
                    {isAcquiring ? <SpinnerIcon /> : "Долучитись"}
                </Button>
                {volunteer.id === userVolunteer?.id && (
                    <Button
                        size="lg"
                        onClick={createNextMission}
                        className="rounded-[10px] "
                    >
                        <PlusIcon />
                    </Button>
                )}
            </div>

            <H className="mb-3 mt-8" type="h3">
                Логістичний ланцюжок
            </H>
            <div className="flex flex-wrap gap-x-8 pb-9">
                {prevEvents.map((event, i) => (
                    <div key={event.id} className="flex items-center gap-x-4">
                        <div
                            className={`${i === 0 ? "rotate-180" : "rotate-90"} mr-4 scale-[3]`}
                        >
                            <ArrowDownIcon />
                        </div>
                        <MissionCard {...event} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MissionInfo;
