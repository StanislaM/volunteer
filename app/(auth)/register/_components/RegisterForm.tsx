"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React, { useState } from "react";

type Props = {} & React.FormHTMLAttributes<HTMLFormElement>;

const RegisterForm = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [region, setRegion] = useState("");

    return (
        <form className="flex w-[395px] flex-col items-center">
            <Input
                placeholder="Ім'я"
                type="text"
                className="mb-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                placeholder="Прізвище"
                type="text"
                className="mb-8"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />

            <Input
                placeholder="Регіон"
                type="text"
                className="mb-8"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            />

            <Input
                placeholder="Пошта"
                type="email"
                className="mb-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                placeholder="Пароль"
                type="password"
                className="mb-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Input
                placeholder="Повторіть пароль"
                type="password"
                className="mb-10"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <Button size="lg" fontStyle="semibold" className="mb-3 w-full">
                Зареєструватись
            </Button>

            <div>
                <span className="mb-2 font-medium">Вже зареєстровані? </span>

                <Link
                    className="font-semibold underline underline-offset-2"
                    href={"/login"}
                >
                    Вхід
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
