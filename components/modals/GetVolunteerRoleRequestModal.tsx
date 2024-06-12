import React from "react";
import Modal from "./Modal";
import XMarkIcon from "../icons/XMarkIcon";
import H from "../ui/H";
import GetVolunteerRoleRequestForm from "../GetVolunteerRoleRequestForm";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

const GetVolunteerRoleRequestModal = ({ isOpen, setIsOpen }: Props) => {
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
                        <H type="h3" className="mb-4 text-center">
                            Для отримання ролі волонтера заповніть наступну
                            форму і дочекайтесь перевірки модерацією
                        </H>

                        <GetVolunteerRoleRequestForm
                            closeModal={() => setIsOpen(false)}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default GetVolunteerRoleRequestModal;
