"use client";

import { useState } from "react";
import XMarkIcon from "../icons/XMarkIcon";
import Button from "../ui/Button";
import H from "../ui/H";
import GetVolunteerRoleRequestModal from "./GetVolunteerRoleRequestModal";
import Modal from "./Modal";
import { IVolunteerData } from "@/shared/types";
import SpinnerIcon from "../icons/SpinnerIcon";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    isRequestFormOpen: boolean;
    setIsRequestFormOpen: (state: boolean) => void;
    volunteerData: IVolunteerData | null;
};

const NoVolunteerModal = ({
    isOpen,
    setIsOpen,
    setIsRequestFormOpen,
    volunteerData,
}: Props) => {
    return (
        <>
            {isOpen && (
                <Modal>
                    <div className="relative w-[600px] flex-col items-center rounded-[40px] bg-[#CDEFFF] p-20">
                        <div
                            className="absolute right-8 top-8 h-[31px] w-[31px] cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon size="lg" fill="black" strokeWidth={2} />
                        </div>
                        <H type="h3" className="text-center">
                            Ви ще не є підтвердженим волонтером
                        </H>
                        {volunteerData === null ? (
                            <>
                                <p className="my-4 text-center">
                                    Для того щоб отримати роль волонтера і
                                    створювати нові волонтерські місії, спочатку
                                    заповніть форму і зачекайте доки
                                    адміністратор перевірить інформацію
                                </p>
                                <Button
                                    center
                                    onClick={() => {
                                        setIsRequestFormOpen(true);
                                        setIsOpen(false);
                                    }}
                                >
                                    Заповнити форму
                                </Button>
                            </>
                        ) : !volunteerData.validated ? (
                            <>
                                <p className="my-4 text-center">
                                    Ви вже подали заявку
                                    <br />
                                    Очікуйте доки модерація перевірить і надасть
                                    вам відповідні права <br />
                                </p>
                                <div className="flex justify-center">
                                    <SpinnerIcon size="lg" />
                                </div>
                            </>
                        ) : (
                            <p>Вже вже можете створювати місії</p>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default NoVolunteerModal;
