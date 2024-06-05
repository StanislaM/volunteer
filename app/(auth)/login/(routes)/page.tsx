import Footer from "@/app/(home)/_components/Footer";
import Nav from "@/app/(home)/_components/Nav";
import React from "react";
import LoginForm from "../_components/LoginForm";
import Container from "@/components/Container";
import H from "@/components/ui/H";

type Props = { data: any };

const LoginPage = ({ data }: Props) => {
    return (
        <>
            <Nav />

            <main className="min-h-screen">
                <Container>
                    <section className="pb-[100px] pt-[160px]">
                        <H type="h2" className="pb-16 text-center">
                            Вхід
                        </H>
                        <div className="flex justify-center">
                            <LoginForm />
                        </div>
                    </section>
                </Container>
            </main>

            <Footer />
        </>
    );
};

export default LoginPage;
