"use client";

import { ITmpMissionData } from "@/app/(home)/_sections/Missions";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/ui/Button";
import { IMissionCard } from "@/shared/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const MissionsList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [missions, setMissions] = useState<IMissionCard[]>([]);
    const [currentPages, setCurrentPages] = useState(1);

    const fetchMissions = (pages = 1) => {
        setIsLoading(true);
        setCurrentPages(currentPages + 1);

        axios
            .get(`/api/event/all/${pages - 1}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);

                setMissions([
                    ...missions,
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
                                    participants: 22,
                                },
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
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    return (
        <div>
            {isLoading && currentPages === 1 ? (
                <div className="mt-8 flex justify-center">
                    <SpinnerIcon size="lg" />
                </div>
            ) : (
                <>
                    <div className="flex max-w-[1000px] flex-wrap justify-between gap-x-3 gap-y-10 px-2">
                        {missions.map((mission) => (
                            <MissionCard key={mission.id} {...mission} />
                        ))}
                    </div>
                    {isLoading ? (
                        <div className="mt-8 flex justify-center">
                            <SpinnerIcon size="lg" />
                        </div>
                    ) : (
                        <Button center className="mt-10" onClick={loadMore}>
                            Завантажити ще...
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default MissionsList;
