"use client";

import { useEffect, useState } from "react";
import XMarkIcon from "../icons/XMarkIcon";
import H from "../ui/H";
import Modal from "./Modal";
import { useQRCode } from "next-qrcode";
import axios from "axios";
import Link from "next/link";
import SpinnerIcon from "../icons/SpinnerIcon";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

const TelegramConectModal = ({ isOpen, setIsOpen }: Props) => {
    const [telegramLink, setTelegramLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { SVG: TelegramQR } = useQRCode();

    const fetchTelegramLink = () => {
        setIsLoading(true);

        const res = axios.post(
            "/api/telegram/connection",
            {},
            { withCredentials: true },
        );

        res.then((data) => setTelegramLink(data.data.url))
            .catch(() => setError("Error"))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchTelegramLink();
    }, []);

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

                        <H type="h3" className="mb-5 text-center">
                            Телеграм бот Волонтер
                        </H>

                        {isLoading ? (
                            <SpinnerIcon size="lg" />
                        ) : error ? (
                            <span className="block text-center text-[18px]">
                                Спершу авторизуйтесь <br />
                                <Link
                                    className="underline underline-offset-2"
                                    href={"/login"}
                                >
                                    Вхід
                                </Link>
                            </span>
                        ) : (
                            <Link
                                href={telegramLink || ""}
                                className="flex justify-center"
                            >
                                <TelegramQR
                                    text={telegramLink || ""}
                                    options={{
                                        width: 200,
                                        color: {
                                            light: "#00000000",
                                            dark: "#000000",
                                        },
                                    }}
                                />
                            </Link>
                        )}

                        {!error ? (
                            <p className="mt-1 text-center">
                                Скануй QR код або натискай та переходь за
                                посиланням
                            </p>
                        ) : null}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default TelegramConectModal;
