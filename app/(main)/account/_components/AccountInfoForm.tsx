"use client";

import ConfirmIcon from "@/components/icons/ConfirmIcon";
import PenIcon from "@/components/icons/PenIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import TelegramConectModal from "@/components/modals/TelegramConectModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { IAccountInfo } from "@/shared/types";
import axios from "axios";
import { useQRCode } from "next-qrcode";
import React, { useEffect, useState } from "react";

type Props = {
    accountInfo: IAccountInfo | undefined;
};

const AccountInfoForm = ({ accountInfo }: Props) => {
    const [firstName, setFirstName] = useState(accountInfo?.firstName);
    const [lastName, setLastName] = useState(accountInfo?.lastName);
    const [email, setEmail] = useState(accountInfo?.email);
    const [isEditing, setIsEditing] = useState(false);
    const [prevInfo, setPrevInfo] = useState<IAccountInfo | undefined>(
        undefined,
    );

    const [showTelegramModal, setShowTelegramModal] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const changeEditing = () => {
        setPrevInfo({
            firstName,
            lastName,
            email,
        } as IAccountInfo);
        setIsEditing((state) => !state);
    };

    const cancelEditing = () => {
        setFirstName(prevInfo?.firstName);
        setLastName(prevInfo?.lastName);
        setEmail(prevInfo?.email);

        setIsEditing(false);
    };

    return (
        <form
            className="flex max-w-[480px] flex-col pl-3 pt-5"
            onSubmit={handleSubmit}
        >
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
        </form>
    );
};

export default AccountInfoForm;
