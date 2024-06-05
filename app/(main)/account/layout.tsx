"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const { status } = useSelector((state: RootState) => state.user);

    if (status === "unauthorized") {
        return <div>Please authorize first</div>;
    }

    return (
        <div className="flex min-h-screen">
            <div>
                <Sidebar />
            </div>
            <div className="w-full overflow-y-scroll px-14 py-16">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
