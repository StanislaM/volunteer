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

import Poll from "@/components/Poll/Poll";
import Comments from "@/components/Comments/CommentsNested";
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
    isBlog = false,
}: Props) => {
    const { volunteer: userVolunteer } = useSelector(
        (state: RootState) => state.user,
    );
    const router = useRouter();
    const [isAcquiring, setIsAcquiring] = useState(false);
    const [prevEvents, setPrevEvents] = useState<IMissionCard[]>([]);
    const [activeTab, setActiveTab] = useState<"info" | "poll" | "comments">(
        "info",
    );

    const createNextMission = () => {
        router.push(`/account/create-mission?prevId=${id}`);
    };

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
                                name:
                                    mission.volunteer.organizationName ||
                                    "Організація",
                                img: "/img/no-avatar.png",
                            },
                            info: {
                                location: mission.location,
                                date: new Date(
                                    mission.date,
                                ).toLocaleDateString(),
                                participants: mission.participantsCount,
                            },
                            volunteer: {
                                id: mission.volunteer.id,
                                isOfficial: mission.volunteer.isOfficial,
                                organizationName:
                                    mission.volunteer.organizationName,
                            },
                            missionStatus: mission.status,
                        };
                    }),
                ),
            )
            .catch((res) => console.log(res));
    }, [id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("uk-UA", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <H className="mb-6 text-center" type="h2">
                    {name}
                </H>

                <div className="mb-6 rounded-lg bg-white p-6 shadow-soft">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-x-2">
                            <LocationIcon className="text-blue-500" />
                            <div>
                                <span className="text-sm text-gray-500">
                                    {isBlog ? "Місце:" : "Місце проведення:"}
                                </span>
                                <div className="font-medium text-gray-dark">
                                    {location}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <ClockIcon className="text-green-500" />
                            <div>
                                <span className="text-sm text-gray-500">
                                    {isBlog ? "Дата:" : "Дата початку:"}
                                </span>
                                <div className="font-medium text-gray-dark">
                                    {formatDate(date)}
                                </div>
                            </div>
                        </div>

                        {!isBlog && (
                            <div className="flex items-center gap-x-2">
                                <ParticipantsIcon className="text-purple-500" />
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Учасники:
                                    </span>
                                    <div className="font-medium text-gray-dark">
                                        {participantsCount}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isBlog && (
                            <div className="flex items-center gap-x-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Статус:
                                    </span>
                                    <div className="font-medium text-gray-dark">
                                        {status}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!isBlog && (
                    <div className="mb-8 flex justify-center gap-x-4">
                        <Button
                            size="lg"
                            onClick={participate}
                            className="px-8"
                        >
                            {isAcquiring ? <SpinnerIcon /> : "Долучитись"}
                        </Button>
                        {volunteer.id === userVolunteer?.id && (
                            <Button
                                size="lg"
                                onClick={createNextMission}
                                variant="outline"
                                className="px-8"
                            >
                                <span className="ml-2">Створити наступну</span>
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <div className="flex rounded-t-lg border-b border-gray-200 bg-white">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`relative px-6 py-4 font-medium transition-colors ${
                            activeTab === "info"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                        }`}
                    >
                        <span>Інформація</span>
                        {activeTab === "info" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>

                    {!isBlog && (
                        <button
                            onClick={() => setActiveTab("poll")}
                            className={`relative px-6 py-4 font-medium transition-colors ${
                                activeTab === "poll"
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        >
                            <span>Опитування</span>
                            {activeTab === "poll" && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                    )}

                    <button
                        onClick={() => setActiveTab("comments")}
                        className={`relative px-6 py-4 font-medium transition-colors ${
                            activeTab === "comments"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                        }`}
                    >
                        <span>Коментарі</span>
                        {activeTab === "comments" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                </div>
            </div>

            <div className="min-h-[500px] rounded-b-lg bg-white shadow-soft">
                {activeTab === "info" && (
                    <div className="p-6">
                        <div className="mb-8">
                            <H className="mb-4" type="h3">
                                {isBlog ? "Зміст" : "Опис місії"}
                            </H>
                            <div className="rounded-lg bg-gray-50 p-4">
                                {isBlog ? (
                                    <div
                                        className="prose max-w-none whitespace-pre-wrap leading-relaxed text-gray-dark"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                ) : (
                                    <p className="whitespace-pre-wrap leading-relaxed text-gray-dark">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <H className="mb-4" type="h3">
                                Категорії діяльності
                            </H>
                            <div className="flex flex-wrap gap-2">
                                {activities.map((activity) => (
                                    <span
                                        key={activity.id}
                                        className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
                                    >
                                        {activity.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <H className="mb-4" type="h3">
                                Організатор
                            </H>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                                <p className="font-medium text-gray-dark">
                                    {volunteer.organizationName}
                                </p>
                                {volunteer.isOfficial && (
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3 w-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {prevEvents.length > 0 && (
                            <div>
                                <H className="mb-4" type="h3">
                                    Логістичний ланцюжок
                                </H>
                                <div className="overflow-x-auto">
                                    <div className="flex min-w-max gap-x-8 pb-4">
                                        {prevEvents.map((event, i) => (
                                            <div
                                                key={event.id}
                                                className="flex flex-shrink-0 items-center gap-x-4"
                                            >
                                                <div
                                                    className={`${
                                                        i === 0
                                                            ? "rotate-180"
                                                            : "rotate-90"
                                                    } scale-[2] text-blue-500`}
                                                >
                                                    <ArrowDownIcon />
                                                </div>
                                                <MissionCard {...event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "poll" && !isBlog && (
                    <div className="p-6">
                        <Poll eventId={id} eventOwnerId={volunteer.id} />
                    </div>
                )}

                {activeTab === "comments" && (
                    <div className="p-6">
                        <Comments eventId={id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionInfo;
