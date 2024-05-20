import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
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
                            <Button size="xl" fontStyle="semibold">
                                Приєднатися
                            </Button>

                            <Button
                                variant="outline"
                                size="xl"
                                className="-z-10 -ml-5 rounded-l-none bg-white pr-5"
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
