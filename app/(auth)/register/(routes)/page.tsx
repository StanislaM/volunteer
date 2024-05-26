import Footer from "@/app/(home)/_components/Footer";
import Nav from "@/app/(home)/_components/Nav";
import Container from "@/components/Container";
import H from "@/components/ui/H";
import React from "react";
import RegisterForm from "../_components/RegisterForm";

type Props = {};

const RegisterPage = (props: Props) => {
    return (
        <>
            <Nav />

            <main className="min-h-screen">
                <Container>
                    <section className="pt-[160px]">
                        <H type="h2" className="pb-16 text-center">
                            Зареєструватись
                        </H>
                        <div className="flex justify-center">
                            <RegisterForm />
                        </div>
                    </section>
                </Container>
            </main>

            <Footer />
        </>
    );
};

export default RegisterPage;
