import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";
import React from "react";

type Props = {};

const CompletedMissionsPage = (props: Props) => {
    return (
        <div>
            <H type="h3" className="text-center">
                Виконанні місії
            </H>

            <Separator />

            <div>
                <MissionsList extendable completedMissions />
            </div>
        </div>
    );
};

export default CompletedMissionsPage;
