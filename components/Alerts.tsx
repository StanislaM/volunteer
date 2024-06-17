"use client";

import React, { useEffect, useMemo, useState } from "react";
import BellIcon from "./icons/BellIcon";
import axios from "axios";
import { IMessage } from "@/shared/types";
import { useRouter } from "next/navigation";

type TMessage = ({
    id,
    content,
    time,
    seen,
    event,
}: {
    id: number;
    content: string;
    time: string;
    seen: boolean;
    event: {
        id: number;
    };
}) => JSX.Element;

const Message: TMessage = ({ id, content, time, seen, event }) => {
    const router = useRouter();

    const onSee = () => {
        axios
            .patch(`/api/update/my/${id}`, {}, { withCredentials: true })
            .then((res) => console.log(res))
            .catch((res) => console.log(res));

        router.push(`/mission/${event.id}`);
    };

    return (
        <div
            className={`flex cursor-pointer flex-col rounded-xl border-2 bg-gray-light p-3 ${!seen ? "border-red-300" : ""}`}
            role="link"
            onClick={onSee}
        >
            <span>{content}</span>
            <span className="mt-1 border-t-2 pt-1">
                {new Date(time).toLocaleDateString("uk-UA", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}
            </span>
        </div>
    );
};

type Props = {};

const Alerts = (props: Props) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchMessages = () => {
        axios
            .get("/api/update/my/0", { withCredentials: true })
            .then((res) => {
                console.log(res);
                setMessages(res.data);
            })
            .catch((res) => console.log(res));
    };

    const unreadCount = useMemo(
        () => messages.filter((message) => !message.seen).length,
        [messages],
    );
    console.log(unreadCount);

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="fixed bottom-8 right-8 ">
            <div
                className={`relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-main-color-light before:absolute before:right-0 before:top-0 before:block before:h-3 before:w-3 before:rounded-full before:bg-red-500 before:opacity-0 before:content-[''] ${unreadCount > 0 ? "before:opacity-100" : ""} `}
                role="button"
                onClick={() => setIsOpen((state) => !state)}
            >
                <BellIcon />
            </div>

            <div
                className={`absolute bottom-20 right-0 flex w-[270px] flex-col gap-y-4 transition-opacity ${isOpen ? " opacity-100" : "pointer-events-none opacity-0"}`}
            >
                {messages.map((message) => (
                    <Message key={message.id} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Alerts;
