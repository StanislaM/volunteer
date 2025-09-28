"use client";

import React from "react";
import Nav from "../../_components/Nav";
import Footer from "../../_components/Footer";
import Container from "@/components/Container";
import H from "@/components/ui/H";
import MissionsList from "@/components/MissionsList";

type Props = {};

const BlogPage = (props: Props) => {
    return (
        <>
            <Nav />

            <main className="min-h-dvh pt-32">
                <Container>
                    <H type="h2" className="mb-10 text-center">
                        Блог
                    </H>
                    <p className="mx-auto mb-10 max-w-[590px] text-center text-2xl font-light leading-[40px]">
                        Читайте останні новини та статті від наших волонтерів
                    </p>

                    <MissionsList extendable blog={true} />
                </Container>
            </main>

            <Footer />
        </>
    );
};

export default BlogPage;
