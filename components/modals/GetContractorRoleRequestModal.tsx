"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import XMarkIcon from "../icons/XMarkIcon";
import H from "../ui/H";
import axios from "axios";
import GroupCheckbox from "../ui/GroupCheckbox";
import Button from "../ui/Button";
import SpinnerIcon from "../icons/SpinnerIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { autoLogin } from "@/lib/features/user/userSlice";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

const GetContractorRoleRequestModal = ({ isOpen, setIsOpen }: Props) => {
    const { contractor } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch() as AppDispatch;
    const [activities, setActivities] = useState<
        { id: number; name: string }[]
    >([]);
    const [choosenActivities, setchoosenActivities] = useState<number[]>([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        axios
            .get("/api/activity-category", { withCredentials: true })
            .then((res) => setActivities(res.data))
            .catch((res) => console.log(res));
    }, []);

    const sendRequest = () => {
        setIsSending(true);

        axios
            .post(
                "/api/contractor",
                {
                    activities: choosenActivities,
                },
                {
                    withCredentials: true,
                },
            )
            .then(() => {
                dispatch(autoLogin()).then(() => setIsOpen(false));
            })
            .catch((res) => console.log(res))
            .finally(() => setIsSending(false));
    };

    return (
        <>
            {isOpen && (
                <Modal>
                    <div className="relative w-[600px] flex-col items-center rounded-[40px] bg-[#CDEFFF] p-20 pb-10">
                        <div
                            className="absolute right-8 top-8 h-[31px] w-[31px] cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon size="lg" fill="black" strokeWidth={2} />
                        </div>
                        <H type="h3" className="mb-4 text-center">
                            {!contractor
                                ? "Для отримання ролі підрялника оберіть категорії за якими ви будете отримувати повідомлення"
                                : "Ви вже є підрядником, проте можете змінити категорії на які підписані"}
                        </H>

                        <GroupCheckbox
                            className="pl-10"
                            options={activities.map((activity) => {
                                return {
                                    id: activity.id,
                                    value: activity.name,
                                };
                            })}
                            selectedValues={choosenActivities}
                            setSelectedValues={setchoosenActivities}
                        />

                        <Button center className="mt-4" onClick={sendRequest}>
                            {isSending ? <SpinnerIcon /> : "Відправити"}
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default GetContractorRoleRequestModal;
