"use client";

import Container from "@/components/Container";
import MissionsList from "@/components/MissionsList";
import H from "@/components/ui/H";

type Props = {};

const Blog = (props: Props) => {
    return (
        <section className="relative bg-gray-50 py-[30px]">
            <Container>
                <H type="h2" className="text-center">
                    Блог
                </H>

                <MissionsList className="mt-6" blog={true} />
            </Container>
        </section>
    );
};

export default Blog;
