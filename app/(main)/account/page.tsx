"use client";

import H from "@/components/ui/H";
import React, { useEffect, useState } from "react";
import AccountInfoForm from "./_components/AccountInfoForm";
import { IAccountInfo } from "@/shared/types";
import axios from "axios";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Separator from "@/components/ui/Separator";

type Props = {};

const AccountInfoPage = (props: Props) => {
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
                <AccountInfoForm accountInfo={accountInfo} />
            ) : (
                <SpinnerIcon />
            )}
        </div>
    );
};

export default AccountInfoPage;
