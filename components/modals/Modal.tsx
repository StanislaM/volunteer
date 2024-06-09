"use client";

type Props = {
    children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
    return (
        <div className="fixed left-0 top-0 z-[9999999] flex h-dvh w-dvw items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
            {children}
        </div>
    );
};

export default Modal;
