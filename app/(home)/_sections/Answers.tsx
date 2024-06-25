import Boble from "@/components/Boble";
import Container from "@/components/Container";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";

type TArticle = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => JSX.Element;

const Article: TArticle = ({ question, answer }) => {
    return (
        <div className="flex max-w-[500px] flex-col">
            <span className="text-[32px] font-medium">{question}</span>
            <p className="text-xl font-light leading-[40px]">{answer}</p>
        </div>
    );
};

type Props = {};

const Answers = (props: Props) => {
    return (
        <section className="relative pb-[80px] pt-[40px]">
            <Boble variant="boble4" className="-right-[150px] -top-[350px]" />
            <Boble variant="boble5" className="-left-[170px] " />

            <Container>
                <H type="h2" className="text-center">
                    {staticData.answersSection.sectionTitle}
                </H>

                <div className="mt-12 flex flex-wrap items-start justify-between gap-y-10 px-12">
                    {staticData.answersSection.articles.map((article, i) => (
                        <Article key={i} {...article} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Answers;
