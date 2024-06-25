"use client";

import React, { Suspense, useState } from "react";
import Nav from "../../_components/Nav";
import Footer from "../../_components/Footer";

import H from "@/components/ui/H";
import Filter from "./_components/Filter";
import MissionsList from "@/components/MissionsList";
import { TFilters } from "@/shared/types";

type Props = {};

const MissionsPage = (props: Props) => {
    const [filters, setFilters] = useState<TFilters>({
        name: "",
        activities: [],
    });

    return (
        <>
            <Nav />

            <H type="h2" className="mb-10 mt-32 text-center">
                Список всіх місій
            </H>

            <main className="flex min-h-dvh justify-center pb-16">
                <div className="flex gap-x-10 pr-36">
                    <Suspense>
                        <Filter filters={filters} setFilters={setFilters} />
                    </Suspense>

                    <div className="w-[1000px]">
                        <MissionsList extendable filters={filters} />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default MissionsPage;
