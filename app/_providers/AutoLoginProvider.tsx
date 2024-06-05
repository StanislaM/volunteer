"use client";

import { autoLogin } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {};

const AutoLoginProvider = (props: Props) => {
    const dispatch = useDispatch() as AppDispatch;

    useEffect(() => {
        dispatch(autoLogin());
    }, []);

    return <></>;
};

export default AutoLoginProvider;
