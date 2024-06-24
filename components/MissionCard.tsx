"use client";

import { IMissionCard, IPreviousEvents } from "@/shared/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocationIcon from "./icons/LocationIcon";
import ClockIcon from "./icons/ClockIcon";
import ParticipantsIcon from "./icons/ParticipantsIcon";
import HeartIcon from "./icons/HeartIcon";
import ShareIcon from "./icons/ShareIcon";
import Button from "./ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import SpinnerIcon from "./icons/SpinnerIcon";
import ClipIcon from "./icons/ClipIcon";
import CompleteIcon from "./icons/CompleteIcon";
import PlusIcon from "./icons/PlusIcon";

type TInfoBlock = ({
    Icon,
    value,
}: {
    Icon: React.ReactNode;
    value: string | number;
}) => JSX.Element;

const InfoBlock: TInfoBlock = ({ Icon, value }) => {
    return (
        <div className="flex h-[28px] items-center justify-center gap-x-1 rounded-[7px] bg-gray-light px-[6px]">
            {Icon}

            <span className="text-[14px] text-gray-dark">{value}</span>
        </div>
    );
};

type Props = {
    isActive?: boolean;
    volunteer?: {
        id: number;
    };
} & IMissionCard;

const MissionCard = ({
    id,
    info,
    descr,
    host,
    title,
    volunteer,
    missionStatus,
    isActive = false,
}: Props) => {
    const { status, volunteer: userVolunteer } = useSelector(
        (state: RootState) => state.user,
    );
    const router = useRouter();
    const [isAcquiring, setIsAcquiring] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    const [hostImage, setHostImage] = useState(
        host.img || "/img/no-avatar.png",
    );

    const navigateToMission = (id: string | number) => {
        router.push(`/mission/${id}`);
    };

    const onParticipate = () => {
        if (status !== "authorized") {
            router.push("/login");
        }

        if (status === "authorized") {
            setIsAcquiring(true);

            axios
                .post(
                    `/api/event/${id}/participate`,
                    {},
                    { withCredentials: true },
                )
                .then((res) => {
                    console.log(res);
                    router.push("/account/active-missions");
                })
                .catch((res) => console.log(res))
                .finally(() => setIsAcquiring(false));
        }
    };

    const onEndMission = () => {
        setIsCompleting(true);
        axios
            .patch(
                `/api/event/${id}`,
                {
                    status: "Завершено",
                },
                {
                    withCredentials: true,
                },
            )
            .then(() => router.push("/account/completed-missions"))
            .catch((res) => console.log(res))
            .finally(() => setIsCompleting(false));
    };

    const createNextMission = () => {
        router.push(`/account/create-mission?prevId=${id}`);
    };

    return (
        <div className="flex h-[245px] w-[430px] flex-col rounded-[20px] bg-white py-6 pl-7 pr-[22px] shadow-soft">
            <div className="flex items-start justify-between">
                <div className="max-w-[285px]">
                    <span
                        className="cursor-pointer text-[22px] font-semibold text-gray-dark underline"
                        role="link"
                        onClick={() => navigateToMission(id)}
                    >
                        {title.slice(0, 20) +
                            `${title.length >= 20 ? "..." : ""}`}
                    </span>
                    <p className="mt-1 break-words text-[16px] font-medium leading-[22px] text-gray-medium">
                        {descr.slice(0, 45) +
                            `${descr.length >= 45 ? "..." : ""}`}
                    </p>
                </div>

                <div className="item-center flex flex-col gap-y-1 pt-1">
                    <Image
                        src={hostImage}
                        onError={() => setHostImage("/img/no-avatar.png")}
                        alt="host-image"
                        width={59}
                        height={59}
                    />
                    <span className="font-medium text-gray-dark">
                        {host.name.slice(0, 10)}
                    </span>
                </div>
            </div>

            <div className="mt-1 flex items-center justify-start gap-x-3">
                <InfoBlock Icon={<LocationIcon />} value={info.location} />
                <InfoBlock Icon={<ClockIcon />} value={info.date} />
                <InfoBlock
                    Icon={<ParticipantsIcon />}
                    value={info.participants}
                />
            </div>

            <div className="mt-5 h-0 w-full border-t-2 border-dotted border-gray-semi-light opacity-50 " />

            <div className="mt-4 flex items-start justify-between">
                <div className="flex items-center justify-start gap-x-2">
                    <div
                        className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border-2 border-gray-semi-light"
                        role="button"
                    >
                        <HeartIcon />
                    </div>
                    <div
                        className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border-2 border-gray-semi-light"
                        role="button"
                    >
                        <ShareIcon />
                    </div>
                </div>

                <div className="flex h-full gap-x-2">
                    {missionStatus === "Завершено" && (
                        <div className="flex h-full items-center justify-center rounded-[20px] bg-green-300 px-5">
                            <CompleteIcon />
                        </div>
                    )}

                    {volunteer?.id === userVolunteer?.id && (
                        <>
                            <Button
                                onClick={createNextMission}
                                className="h-full rounded-[10px] "
                            >
                                <PlusIcon />
                            </Button>

                            {missionStatus !== "Завершено" && (
                                <Button
                                    onClick={onEndMission}
                                    disabled
                                    className="h-full rounded-[10px]  px-7"
                                >
                                    {isActive ? (
                                        <ClipIcon />
                                    ) : isCompleting ? (
                                        <SpinnerIcon />
                                    ) : (
                                        "Завершити"
                                    )}
                                </Button>
                            )}
                        </>
                    )}

                    {volunteer?.id !== userVolunteer?.id && (
                        <Button
                            className={`h-full rounded-[10px] px-7 ${isActive ? "bg-yellow-200" : ""}`}
                            onClick={() => {
                                if (!isActive) {
                                    onParticipate();
                                }
                            }}
                            disabled={isActive}
                        >
                            {isActive ? (
                                <ClipIcon />
                            ) : isAcquiring ? (
                                <SpinnerIcon />
                            ) : (
                                "Доєднатись"
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MissionCard;
