"use client";

import Container from "@/components/Container";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import { RootState } from "@/lib/store";
import { staticData } from "@/shared/staticData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type Props = {};

const Header = (props: Props) => {
    const router = useRouter();
    const { status } = useSelector((state: RootState) => state.user);

    const navigateToMissions = () => {
        router.push("/missions");
    };
    const navigateToCabinet = () => {
        router.push("/account");
    };

    return (
        <header className="pb-[30px] pt-[200px]">
            <Container>
                <div className="flex items-center">
                    <div className="pl-6">
                        <H className="font-inter" type="h1">
                            {staticData.headerSection.headerTitle}
                        </H>

                        <p className="max-w-[590px] font-inter text-2xl font-light leading-[40px]">
                            {staticData.headerSection.headerText}
                        </p>

                        <div className="mt-4 flex">
                            <Button
                                hoverEffect={false}
                                size="xl"
                                fontStyle="semibold"
                                className="z-20"
                                onClick={navigateToCabinet}
                            >
                                {status === "authorized" ? (
                                    "Кабінет"
                                ) : status === "authorizating" ? (
                                    <SpinnerIcon spin size="sm" />
                                ) : (
                                    "Приєднатись"
                                )}
                            </Button>

                            <Button
                                hoverEffect={false}
                                onClick={navigateToMissions}
                                role="link"
                                variant="outline"
                                size="xl"
                                className="-ml-5 rounded-l-none bg-white pr-5"
                            >
                                Переглянути місії
                            </Button>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <Image
                            src={"/img/header.png"}
                            alt="header-img"
                            width={502}
                            height={502}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
