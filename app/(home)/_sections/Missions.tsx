"use client";

import Boble from "@/components/Boble";
import Container from "@/components/Container";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";
import { IMissionCard } from "@/shared/types";
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

type Props = {};

const Missions = (props: Props) => {
    const [missions, setMissions] = useState<IMissionCard[]>([]);

    useEffect(() => {
        //fetch data...

        setMissions(serverData);
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

                <div className="mt-8 flex flex-wrap justify-between gap-y-20 px-20">
                    {missions.map((mission) => (
                        <MissionCard key={mission.id} {...mission} />
                    ))}
                </div>

                <Button center size="lg" fontStyle="regular" className="mt-12">
                    Більше місій...
                </Button>
            </Container>
        </section>
    );
};

export default Missions;
