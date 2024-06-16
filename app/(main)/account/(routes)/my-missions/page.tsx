"use client";

import { ITmpMissionData } from "@/app/(home)/_sections/Missions";
import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";
import Separator from "@/components/ui/Separator";
import React, { useEffect, useState } from "react";

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
