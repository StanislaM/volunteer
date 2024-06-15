"use client";

import Boble from "@/components/Boble";
import Container from "@/components/Container";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";
import { IMissionCard } from "@/shared/types";
import axios from "axios";
import { useEffect, useState } from "react";

const serverData: IMissionCard[] = [
    {
        id: "1",
        title: "Перевезти шини",
        descr: "HelpMatch made organizing our community outreach a",
        host: {
            name: "Іван Д.",
            img: "",
        },
        info: {
            location: "Чернігів",
            date: "12 травня",
            participants: 20,
        },
    },
    {
        id: "2",
        title: "Перевезти шини",
        descr: "HelpMatch made organizing our community outreach a",
        host: {
            name: "Іван Д.",
            img: "",
        },
        info: {
            location: "Чернігів",
            date: "12 травня",
            participants: 20,
        },
    },
    {
        id: "3",
        title: "Перевезти шини",
        descr: "HelpMatch made organizing our community outreach a",
        host: {
            name: "Іван Д.",
            img: "",
        },
        info: {
            location: "Чернігів",
            date: "12 травня",
            participants: 20,
        },
    },
    {
        id: "4",
        title: "Перевезти шини",
        descr: "HelpMatch made organizing our community outreach a",
        host: {
            name: "Іван Д.",
            img: "",
        },
        info: {
            location: "Чернігів",
            date: "12 травня",
            participants: 20,
        },
    },
];

export interface ITmpMissionData {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    status: string;
}

type Props = {};

const Missions = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [missions, setMissions] = useState<IMissionCard[]>([]);

    const fetchMissions = () => {
        setIsLoading(true);

        axios
            .get("/api/event/all/0", { withCredentials: true })
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
        <section className="relative py-[30px]">
            <Boble className="-left-[350px] top-[130px]" />
            <Boble className="-right-[200px] top-[300px]" variant="boble2" />

            <Container>
                <H type="h2" className="text-center">
                    {staticData.missionsSection.sectionTitle}
                </H>
                <p className="mx-auto max-w-[590px] text-center text-2xl font-light leading-[40px]">
                    {staticData.missionsSection.sectionText}
                </p>

                {isLoading ? (
                    <div className="mt-8 flex justify-center">
                        <SpinnerIcon size="lg" />
                    </div>
                ) : (
                    <div className="mt-8 flex flex-wrap justify-between gap-y-20 px-20">
                        {missions.map((mission) => (
                            <MissionCard key={mission.id} {...mission} />
                        ))}
                    </div>
                )}

                <Button center size="lg" fontStyle="regular" className="mt-12">
                    Більше місій...
                </Button>
            </Container>
        </section>
    );
};

export default Missions;
