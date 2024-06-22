"use client";

import H from "@/components/ui/H";
import React, { useEffect, useState } from "react";
import AccountInfoForm from "./_components/AccountInfoForm";
import { IAccountInfo } from "@/shared/types";
import axios from "axios";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Separator from "@/components/ui/Separator";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import VolunteerInfoForm from "./_components/VolunteerInfoForm";

type Props = {};

const AccountInfoPage = (props: Props) => {
    const { volunteer } = useSelector((state: RootState) => state.user);
    const [accountInfo, setAccountInfo] = useState<IAccountInfo | undefined>(
        undefined,
    );
    const [isLoading, setIsLoading] = useState(false);

    const fetchAccountInfo = () => {
        setIsLoading(true);
        const res = axios.get("/api/user/me", {
            withCredentials: true,
        });

        res.then((data) => setAccountInfo(data.data)).finally(() =>
            setIsLoading(false),
        );
    };

    useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div>
            <H type="h3" className="text-center">
                Персональні дані
            </H>

            <Separator />

            {!isLoading ? (
                <>
                    <div className="flex gap-x-20">
                        <AccountInfoForm accountInfo={accountInfo} />

                        {volunteer?.validated && (
                            <VolunteerInfoForm {...volunteer} />
                        )}
                    </div>
                </>
            ) : (
                <SpinnerIcon />
            )}
        </div>
    );
};

export default AccountInfoPage;
