"use client";

import { ITmpMissionData } from "@/app/(home)/_sections/Missions";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/ui/Button";
import { IMissionCard, TFilters } from "@/shared/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
    className?: string;
    extendable?: boolean;
    myMissions?: boolean;
    participantMissions?: boolean;
    completedMissions?: boolean;
    filters?: TFilters;
};

const MissionsList = ({
    className = "",
    extendable = false,
    myMissions = false,
    participantMissions = false,
    completedMissions = undefined,
    filters,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [missions, setMissions] = useState<IMissionCard[]>([]);
    const [currentPages, setCurrentPages] = useState(1);

    const fetchMissions = (pages = 1, clearMissions = false) => {
        setIsLoading(true);

        axios
            .post(
                `/api/event/${myMissions ? "my" : participantMissions ? "participate" : "all"}/${pages - 1}`,
                {
                    search: filters?.name || "",
                    activities: filters?.activities || [],
                    finished: completedMissions,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);

                setMissions([
                    ...missions.filter(() => !clearMissions),
                    ...res.data.map(
                        (mission: ITmpMissionData): IMissionCard => {
                            return {
                                id: mission.id.toString(),
                                title: mission.name,
                                descr: mission.description,
                                host: {
                                    name: "Іван Д.",
                                    img: "",
                                },
                                info: {
                                    date: new Date(
                                        mission.date,
                                    ).toLocaleDateString("uk-UA", {
                                        month: "long",
                                        day: "numeric",
                                    }),
                                    location: mission.location,
                                    participants: mission.participantsCount,
                                },
                                volunteer: mission.volunteer,
                                missionStatus: mission.status,
                            };
                        },
                    ),
                ]);
            })
            .catch((res) => console.log(res))
            .finally(() => setIsLoading(false));
    };

    const loadMore = () => {
        fetchMissions(currentPages + 1);
        setCurrentPages(currentPages + 1);
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    useEffect(() => {
        fetchMissions(1, true);
        setCurrentPages(1);
    }, [filters]);

    return (
        <div className={className}>
            {isLoading && currentPages === 1 ? (
                <div className="mt-8 flex justify-center">
                    <SpinnerIcon size="lg" />
                </div>
            ) : (
                <>
                    <div className="flex w-full flex-wrap justify-around gap-x-3 gap-y-10 px-2">
                        {missions.map((mission) => (
                            <MissionCard
                                key={mission.id}
                                {...mission}
                                isActive={participantMissions}
                            />
                        ))}
                    </div>
                    {isLoading ? (
                        <div className="mt-8 flex justify-center">
                            <SpinnerIcon size="lg" />
                        </div>
                    ) : extendable ? (
                        <Button center className="mt-10" onClick={loadMore}>
                            Завантажити ще...
                        </Button>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default MissionsList;
