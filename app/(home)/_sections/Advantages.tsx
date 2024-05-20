import Boble from "@/components/Boble";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";
import Image from "next/image";

type TAdvantage = ({
    icon,
    title,
    descr,
}: {
    icon: string;
    title: string;
    descr: string;
}) => JSX.Element;

const Advantage: TAdvantage = ({ icon, title, descr }) => {
    return (
        <div className="flex max-w-[485px] items-start gap-x-4">
            <Image
                src={`/advantage-icons/${icon}.svg`}
                alt="advantage-icon"
                width={38}
                height={38}
                className="mt-1"
            />

            <div className="flex flex-col">
                <span className="text-[32px] font-semibold leading-[46px]">
                    {title}
                </span>

                <p className="mb-6 text-2xl font-normal leading-[40px]">
                    {descr}
                </p>
            </div>
        </div>
    );
};

type Props = {};

const Advantages = (props: Props) => {
    return (
        <section className="relative pb-[40px] pt-[50px]">
            <Boble variant="boble3" className="-left-[250px] -top-[100px]" />

            <Container>
                <div className="flex items-start justify-between">
                    <div className="max-w-[575px]">
                        <H type="h2">
                            {staticData.advantagesSection.sectionTitle}
                        </H>
                        <p className="mt-4 max-w-[525px] text-2xl font-light leading-[40px]">
                            {staticData.advantagesSection.sectionText}
                        </p>

                        <Button
                            size="xl"
                            className="mt-3 bg-white"
                            variant="outline"
                        >
                            Детальніше
                        </Button>
                    </div>

                    <div className="mt-24">
                        {staticData.advantagesSection.advantages.map(
                            (advantage, i) => (
                                <Advantage key={i} {...advantage} />
                            ),
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Advantages;
