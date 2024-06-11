"use client";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { autoLogin } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { validateRegisterFormData } from "@/lib/validators";
import { regions } from "@/shared/staticData";
import { IRegisterData } from "@/shared/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {} & React.FormHTMLAttributes<HTMLFormElement>;

const someData: IRegisterData = {
    firstName: "Stas",
    lastName: "Stas",
    email: "sadsa@sads.com",
    password: "Qwerty123",
    repeatPassword: "Qwerty123",
    region: "Чернігівська область",
};

const RegisterForm = (props: Props) => {
    const dispatch = useDispatch() as AppDispatch;
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [surname, setSurname] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [region, setRegion] = useState("");
    const [regionError, setRegionError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setRepeatPasswordError("");
        setNameError("");
        setSurnameError("");
        setRegionError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        clearErrors();

        const dataForValidation: IRegisterData = {
            firstName: name,
            lastName: surname,
            email: email,
            region: region,
            password: password,
            repeatPassword: repeatPassword,
        };

        console.log(dataForValidation);
        console.log(validateRegisterFormData(dataForValidation));

        const validationErrors = validateRegisterFormData(dataForValidation);

        if (Object.keys(validationErrors).length > 0) {
            if (validationErrors.firstName) {
                setNameError(validationErrors.firstName);
            }

            if (validationErrors.lastName) {
                setSurnameError(validationErrors.lastName);
            }

            if (validationErrors.email) {
                setEmailError(validationErrors.email);
            }

            if (validationErrors.region) {
                setRegionError(validationErrors.region);
            }

            if (validationErrors.password) {
                setPasswordError(validationErrors.password);
            }

            if (validationErrors.repeatPassword) {
                setRepeatPasswordError(validationErrors.repeatPassword);
            }

            return;
        }

        setIsRegistering(true);

        axios
            .post("/api/auth/register", dataForValidation, {
                withCredentials: true,
            })
            .then((res) => {
                dispatch(autoLogin()).then(() => router.push("/account"));
            })
            .catch((res) => console.log(res))
            .finally(() => setIsRegistering(false));
    };

    return (
        <form
            className="flex w-[395px] flex-col items-center"
            onSubmit={handleSubmit}
        >
            {nameError && (
                <span className="self-start pl-3 text-red-400">
                    {nameError}
                </span>
            )}
            <Input
                placeholder="Ім'я"
                type="text"
                className="mb-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
            />

            {surnameError && (
                <span className="self-start pl-3 text-red-400">
                    {surnameError}
                </span>
            )}
            <Input
                placeholder="Прізвище"
                type="text"
                className="mb-8"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                error={surnameError}
            />

            {regionError && (
                <span className="self-start pl-3 text-red-400">
                    {regionError}
                </span>
            )}
            <Select
                className="mb-8 w-full"
                options={regions}
                value={region}
                setValue={setRegion}
                placeholder="Оберіть область"
                error={regionError}
            />

            {emailError && (
                <span className="self-start pl-3 text-red-400">
                    {emailError}
                </span>
            )}
            <Input
                placeholder="Пошта"
                type="email"
                className="mb-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />

            {passwordError && (
                <span className="mb-2 self-start pl-3 text-red-400">
                    {passwordError}
                </span>
            )}
            <Input
                placeholder="Пароль"
                type="password"
                className="mb-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />

            {repeatPasswordError && (
                <span className="self-start pl-3 text-red-400">
                    {repeatPasswordError}
                </span>
            )}
            <Input
                placeholder="Повторіть пароль"
                type="password"
                className="mb-10"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={repeatPasswordError}
            />

            <Button
                size="lg"
                fontStyle="semibold"
                className="mb-3 w-full"
                type="submit"
            >
                {isRegistering ? <SpinnerIcon /> : "Зареєструватись"}
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
