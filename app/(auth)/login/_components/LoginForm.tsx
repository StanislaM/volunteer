"use client";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authorizeByLoginData } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {} & React.FormHTMLAttributes<HTMLFormElement>;

const LoginForm = ({ ...props }: Props) => {
    const router = useRouter();
    const { status } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch() as AppDispatch;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateToRegister = () => {
        router.push("/register");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        dispatch(authorizeByLoginData({ email, password })).then(() =>
            router.push("/account"),
        );
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
                {status === "authorizating" ? <SpinnerIcon spin /> : "Увійти"}
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
