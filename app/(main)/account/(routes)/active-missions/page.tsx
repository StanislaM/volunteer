"use client";

import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";

type Props = {};

const ActiveMissionsPage = (props: Props) => {
    return (
        <div>
            <H type="h3" className="text-center">
                Мої місії
            </H>

            <Separator />

            <div>
                <MissionsList extendable participantMissions />
            </div>
        </div>
    );
};

export default ActiveMissionsPage;
