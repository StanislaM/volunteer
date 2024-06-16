"use client";

import Footer from "@/app/(home)/_components/Footer";
import Nav from "@/app/(home)/_components/Nav";
import Container from "@/components/Container";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { IMissionFullInfo } from "@/shared/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MissionInfo from "../_components/MissionInfo";

type Props = {
    params: {
        id: string;
    };
};

const MissionPage = ({ params }: Props) => {
    const [missionInfo, setMissionInfo] = useState<
        IMissionFullInfo | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMissionInfo = () => {
        setIsLoading(true);

        axios
            .get(`/api/event/${params.id}`)
            .then((res) => setMissionInfo(res.data as IMissionFullInfo))
            .catch((res) => console.log(res))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchMissionInfo();
    }, []);

    return (
        <div>
            <Nav />

            <main className="min-h-dvh pt-32">
                <Container>
                    {isLoading ? (
                        <div className="flex justify-center">
                            <SpinnerIcon size="lg" />
                        </div>
                    ) : (
                        missionInfo && (
                            <MissionInfo id={params.id} {...missionInfo} />
                        )
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default MissionPage;
