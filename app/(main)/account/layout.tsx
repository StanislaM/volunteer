"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Alerts from "@/components/Alerts";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const { status } = useSelector((state: RootState) => state.user);

    if (status === "unauthorized") {
        return <div>Please authorize first</div>;
    }

    return (
        <div className="flex h-screen">
            <div>
                <Sidebar />
            </div>
            <div className="w-full overflow-y-scroll px-14 py-12">
                {children}
            </div>

            <Alerts />
        </div>
    );
};

export default MainLayout;
