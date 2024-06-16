import React from "react";
import Nav from "../../_components/Nav";
import Footer from "../../_components/Footer";
import MissionsList from "./_components/MissionsList";
import H from "@/components/ui/H";
import Filter from "./_components/Filter";
import Container from "@/components/Container";

type Props = {};

const MissionsPage = (props: Props) => {
    return (
        <>
            <Nav />

            <H type="h2" className="mb-10 mt-32 text-center">
                Список всіх місій
            </H>

            <main className="flex justify-center pb-16">
                <div className="flex gap-x-10 pr-36">
                    <Filter />

                    <MissionsList />
                </div>
            </main>

            <Footer />
        </>
    );
};

export default MissionsPage;
