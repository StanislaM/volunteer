"use client";

import { useState } from "react";
import TelegramIcon from "./icons/TelegramIcon";
import TelegramConectModal from "./modals/TelegramConectModal";

type Props = {};

const TelegramPopup = (props: Props) => {
    const [showTelegramModal, setShowTelegramModal] = useState(false);

    return (
        <>
            <div
                className="fixed right-4 top-48 z-[99999] flex h-[60px] max-w-[60px] cursor-pointer items-center justify-start overflow-hidden rounded-[10px] bg-[#CDEFFF] px-3 transition-all duration-300 hover:max-w-[300px]"
                role="button"
                onClick={() => setShowTelegramModal(true)}
            >
                <div className="flex w-max items-center gap-x-6">
                    <TelegramIcon size="lg" />
                    <span className="text-nowrap text-[12px]">
                        Приєднатися до телеграм бота
                    </span>
                </div>
            </div>

            <TelegramConectModal
                isOpen={showTelegramModal}
                setIsOpen={setShowTelegramModal}
            />
        </>
    );
};

export default TelegramPopup;
