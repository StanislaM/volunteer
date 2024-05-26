"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { RootState } from "@/lib/store";

import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {} & React.FormHTMLAttributes<HTMLFormElement>;

const LoginForm = ({ ...props }: Props) => {
    const router = useRouter();
    const userName = useSelector((state: RootState) => state.user.name);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateToRegister = () => {
        // router.push("/register");
        const res = fetch("/api/me", { credentials: "include" });
        res.then((data) => console.log(data));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const res = axios.post(
            "https://diplomas.medilawvichi.com/auth/login",
            {
                email: "example@gmail.com",
                password: "12345",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );

        res.then((data) => console.log(data));
    };

    return (
        <form
            className="flex w-[395px] flex-col items-center"
            onSubmit={handleSubmit}
            {...props}
        >
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
                className="mb-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                size="lg"
                fontStyle="semibold"
                className="mb-3 w-full"
                type="submit"
            >
                Увійти
            </Button>

            <span className="mb-2 font-medium">або</span>

            <Button
                type="button"
                onClick={navigateToRegister}
                size="lg"
                variant="outline"
                fontStyle="semibold"
                className="mb-1 w-full"
            >
                Зареєструватись
            </Button>

            <Link className="text-[18px] font-medium" href={"/forgot-password"}>
                Забули пароль?
            </Link>
        </form>
    );
};

export default LoginForm;
