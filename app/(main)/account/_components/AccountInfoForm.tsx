"use client";

import ConfirmIcon from "@/components/icons/ConfirmIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import KeyIcon from "@/components/icons/KeyIcon";
import PenIcon from "@/components/icons/PenIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import GetContractorRoleRequestModal from "@/components/modals/GetContractorRoleRequestModal";
import TelegramConectModal from "@/components/modals/TelegramConectModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { autoLogin } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { regions } from "@/shared/staticData";
import { IAccountInfo } from "@/shared/types";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
    accountInfo: IAccountInfo | undefined;
};

const AccountInfoForm = ({ accountInfo }: Props) => {
    const dispatch = useDispatch() as AppDispatch;
    const [firstName, setFirstName] = useState(accountInfo?.firstName);
    const [lastName, setLastName] = useState(accountInfo?.lastName);
    const [email, setEmail] = useState(accountInfo?.email);
    const [region, setRegion] = useState(accountInfo?.region || "");
    const [isEditing, setIsEditing] = useState(false);
    const [prevInfo, setPrevInfo] = useState<IAccountInfo | undefined>(
        undefined,
    );

    const [showTelegramModal, setShowTelegramModal] = useState(false);
    const [showContractorModal, setShowContractorModal] = useState(false);

    const [newPasswrod, setNewPassword] = useState("");
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);

    const handleSubmit = () => {
        const dataForValidation: IAccountInfo = {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            region: region,
        };

        axios
            .patch("/api/user/me", dataForValidation, {
                withCredentials: true,
            })
            .then(() => {
                setIsEditing(false);
                dispatch(autoLogin());
            })
            .catch((res) => {
                console.log(res);
                cancelEditing();
            });
    };

    const changePassword = () => {
        axios
            .patch(
                "/api/user/password/me",
                { password: newPasswrod },
                {
                    withCredentials: true,
                },
            )
            .then(() => {
                dispatch(autoLogin());
            })
            .catch((res) => {
                console.log(res);
            })
            .finally(() => {
                setIsPasswordEditing(false);
                setNewPassword("");
            });
    };

    const changeEditing = () => {
        if (isEditing) {
            handleSubmit();
            return;
        }

        setPrevInfo({
            firstName,
            lastName,
            email,
            region,
        } as IAccountInfo);
        setIsEditing((state) => !state);
    };

    const cancelEditing = () => {
        setFirstName(prevInfo?.firstName);
        setLastName(prevInfo?.lastName);
        setEmail(prevInfo?.email);
        setRegion(prevInfo?.region || "");

        setIsEditing(false);
    };

    return (
        <form className="flex w-[480px] flex-col pl-3 pt-5">
            <Label>Ім’я</Label>
            <Input
                variant="white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
            />

            <Label className="mt-4">Прізвище</Label>
            <Input
                variant="white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
            />

            <Label className="mt-4">Пошта</Label>
            <Input
                variant="white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
            />

            <Label className="mt-4">Регіон</Label>
            <Select
                className="w-full"
                options={regions}
                value={region}
                setValue={setRegion}
                variant="white"
                disabled={!isEditing}
                placeholder="Оберіть область"
            />

            <div className="mt-6 flex gap-x-4 ">
                <Button
                    className="w-min rounded-[8px]"
                    variant="default"
                    type="button"
                    onClick={changeEditing}
                >
                    {isEditing ? (
                        <div className="flex items-center gap-x-1">
                            <ConfirmIcon />
                            Підтвердити
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-1">
                            <PenIcon />
                            Редагувати
                        </div>
                    )}
                </Button>

                {isEditing && (
                    <Button
                        className="w-min rounded-[8px]"
                        variant="accent"
                        type="button"
                        onClick={cancelEditing}
                    >
                        <div className="flex items-center gap-x-1">
                            <XMarkIcon />
                            Скасувати
                        </div>
                    </Button>
                )}
            </div>

            <Button
                className="mt-5 w-min text-nowrap rounded-[8px] bg-[#CDEFFF]"
                onClick={() => setShowTelegramModal(true)}
                type="button"
            >
                <div className="flex items-center gap-x-1">
                    <>
                        <TelegramIcon />
                        Телеграм Бот
                    </>
                </div>
            </Button>
            <TelegramConectModal
                isOpen={showTelegramModal}
                setIsOpen={setShowTelegramModal}
            />

            <Button
                type="button"
                className="mt-5 w-min text-nowrap rounded-[8px]"
                onClick={() => setShowContractorModal(true)}
            >
                <div className="flex items-center gap-x-1">
                    <>
                        <GroupIcon />
                        Стати підрядником
                    </>
                </div>
            </Button>
            <GetContractorRoleRequestModal
                isOpen={showContractorModal}
                setIsOpen={setShowContractorModal}
            />

            {isPasswordEditing && (
                <Input
                    className="mt-5 w-1/2 border-cherry-pink"
                    variant="white"
                    value={newPasswrod}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            )}

            <Button
                className="mt-5 w-min text-nowrap rounded-[8px]"
                variant="accent"
                type="button"
                onClick={() => {
                    if (isPasswordEditing) {
                        changePassword();
                        return;
                    }
                    setIsPasswordEditing((state) => !state);
                }}
            >
                <div className="flex items-center gap-x-1">
                    <>
                        <KeyIcon />
                        Змінити пароль
                    </>
                </div>
            </Button>
        </form>
    );
};

export default AccountInfoForm;
