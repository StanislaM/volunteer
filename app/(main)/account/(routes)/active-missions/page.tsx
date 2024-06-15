"use client";

import { ITmpMissionData } from "@/app/(home)/_sections/Missions";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import MissionCard from "@/components/MissionCard";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";
import { IMissionCard } from "@/shared/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const ActiveMissionsPage = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [missions, setMissions] = useState<IMissionCard[]>([]);

    const fetchMissions = () => {
        setIsLoading(true);

        axios
            .get("/api/event/participate/0", { withCredentials: true })
            .then((res) => {
                setMissions(
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
                                    { month: "long", day: "numeric" },
                                ),
                                location: mission.location,
                                participants: 22,
                            },
                        };
                    }),
                );
            })
            .catch((res) => console.log(res))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    return (
        <div>
            <H type="h3" className="text-center">
                Мої місії
            </H>

            <Separator />

            {isLoading ? (
                <div className="mt-8 flex justify-center">
                    <SpinnerIcon size="lg" />
                </div>
            ) : (
                <div className="mt-8 flex flex-wrap justify-between gap-y-20 px-20">
                    {missions.map((mission) => (
                        <MissionCard key={mission.id} {...mission} isActive />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveMissionsPage;
