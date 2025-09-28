"use client";

import Boble from "@/components/Boble";
import Container from "@/components/Container";
import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";

export interface ITmpMissionData {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    status: string;
    participantsCount: number;
    isBlog?: boolean;
    volunteer: {
        id: number;
        isOfficial?: boolean;
        organizationName?: string;
    };
}

type Props = {};

const Missions = (props: Props) => {
    return (
        <section className="relative py-[30px]">
            <Container>
                <H type="h2" className="text-center">
                    {staticData.missionsSection.sectionTitle}
                </H>
                <p className="mx-auto max-w-[590px] text-center text-2xl font-light leading-[40px]">
                    {staticData.missionsSection.sectionText}
                </p>

                <MissionsList className="mt-6" blog={false} />
            </Container>
        </section>
    );
};

export default Missions;
