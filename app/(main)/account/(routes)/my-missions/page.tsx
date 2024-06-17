"use client";

import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";

type Props = {};

const AccountPage = (props: Props) => {
    return (
        <div>
            <H type="h3" className="text-center">
                Мої місії
            </H>

            <Separator />

            <div>
                <MissionsList extendable myMissions />
            </div>
        </div>
    );
};

export default AccountPage;
