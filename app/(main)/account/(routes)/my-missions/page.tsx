"use client";

import Button from "@/components/ui/Button";
import { logout } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AccountPage = (props: Props) => {
    const router = useRouter();
    const { firstName, lastName, status } = useSelector(
        (state: RootState) => state.user,
    );
    const dispatch = useDispatch() as AppDispatch;

    if (status === "unauthorized") {
        return <div>Please authorize first</div>;
    }

    const handleLogOut = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <div className="flex w-full justify-between px-10 text-3xl">
            <span>
                {firstName}
                {lastName}
            </span>

            <Button onClick={handleLogOut} size="lg">
                Вихід
            </Button>
        </div>
    );
};

export default AccountPage;
