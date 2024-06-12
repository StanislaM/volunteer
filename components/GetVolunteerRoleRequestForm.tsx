"use client";

import Label from "./ui/Label";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import { validateVolunteerRequestFormData } from "@/lib/validators";
import axios from "axios";
import SpinnerIcon from "./icons/SpinnerIcon";
import Checkbox from "./ui/Checkbox";
import { IGetVolunteerRoleData } from "@/shared/types";
import GroupCheckbox from "./ui/GroupCheckbox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { autoLogin } from "@/lib/features/user/userSlice";

type Props = {
    closeModal: () => void;
};

const GetVolunteerRoleRequestForm = ({ closeModal }: Props) => {
    const dispatch = useDispatch() as AppDispatch;

    const [organizationName, setOrganizationName] = useState("");
    const [organizationNameError, setOrganizationNameError] = useState("");
    const [isSolo, setIsSolo] = useState(false);

    const [activities, setActivities] = useState<
        { id: number; name: string }[]
    >([]);
    const [choosenActivities, setchoosenActivities] = useState<number[]>([]);
    const [activityError, setActivityError] = useState("");

    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        axios
            .get("/api/activity-category", { withCredentials: true })
            .then((res) => setActivities(res.data))
            .catch((res) => console.log(res));
    }, []);

    useEffect(() => {}, [activities]);

    const clearErrors = () => {
        setOrganizationNameError("");
        setActivityError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        clearErrors();

        const dataForValidation: IGetVolunteerRoleData = {
            organizationName: organizationName,
            isSolo: isSolo,
            activities: choosenActivities,
        };

        const validationErrors =
            validateVolunteerRequestFormData(dataForValidation);

        if (Object.keys(validationErrors).length > 0) {
            if (validationErrors.organizationName) {
                setOrganizationNameError(validationErrors.organizationName);
            }

            return;
        }

        setIsSending(true);

        console.log(dataForValidation);

        axios
            .post("/api/volunteer/account", dataForValidation, {
                withCredentials: true,
            })
            .then((data) => {
                console.log(data);
                dispatch(autoLogin()).then(() => closeModal());
            })
            .catch((data) => {
                console.log(data);
            })
            .finally(() => setIsSending(false));
    };

    return (
        <form
            className="mx-auto flex w-[300px] flex-col justify-center"
            onSubmit={handleSubmit}
        >
            <Label className="mb-0 text-xl leading-7">
                {isSolo ? "Ім'я волонтера" : "Назва організації"}
            </Label>
            <Input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                variant="white"
            />
            {organizationNameError && (
                <span className="mb-4 self-start pl-3 text-red-400">
                    {organizationNameError}
                </span>
            )}

            <Checkbox
                className="mt-2"
                title="Я планую допомагати сам"
                isChecked={isSolo}
                setIsChecked={setIsSolo}
            />

            {activityError && (
                <span className="self-start pl-3 text-red-400">
                    {activityError}
                </span>
            )}

            <Label className=" mt-4 text-xl">Оберіть род занять</Label>
            <GroupCheckbox
                options={activities.map((activity) => {
                    return { id: activity.id, value: activity.name };
                })}
                selectedValues={choosenActivities}
                setSelectedValues={setchoosenActivities}
            />

            <Button size="lg" center className="mt-4" type="submit">
                {isSending ? <SpinnerIcon /> : "Надіслати"}
            </Button>
        </form>
    );
};

export default GetVolunteerRoleRequestForm;
