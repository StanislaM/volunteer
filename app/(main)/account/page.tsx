"use client";

import H from "@/components/ui/H";
import React, { useEffect, useState } from "react";
import AccountInfoForm from "./_components/AccountInfoForm";
import { IAccountInfo } from "@/shared/types";
import axios from "axios";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { headers } from "next/headers";
import Button from "@/components/ui/Button";

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
            <H type="h2" className="text-center">
                Персональні дані
            </H>

            <hr className="my-8 w-full border-b-2 border-b-gray-semi-light border-opacity-40" />

            {!isLoading ? (
                <AccountInfoForm accountInfo={accountInfo} />
            ) : (
                <SpinnerIcon />
            )}
        </div>
    );
};

export default AccountInfoPage;
