"use client";

import Button from "@/components/ui/Button";
import GroupCheckbox from "@/components/ui/GroupCheckbox";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { RootState } from "@/lib/store";
import { validateNewMissionFormData } from "@/lib/validators";
import { missionStatuses, TMissionStatuses } from "@/shared/staticData";
import { INewMissionData } from "@/shared/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const NewMissionForm = (props: Props) => {
    const { volunteer } = useSelector((state: RootState) => state.user);

    const [isCreating, setIsCreating] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState("");
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");
    const [activities, setActivities] = useState<
        { id: number; name: string }[]
    >([]);
    const [choosenActivities, setchoosenActivities] = useState<number[]>(
        volunteer?.activities || [],
    );

    useEffect(() => {
        axios
            .get("/api/activity-category", { withCredentials: true })
            .then((res) => setActivities(res.data))
            .catch((res) => console.log(res));
    }, []);

    const clearErrors = () => {
        setNameError("");
        setDescriptionError("");
        setLocationError("");
        setStatusError("");
    };

    const clearFields = () => {
        setName("");
        setDescription("");
        setLocation("");
        setStatus("");
        setActivities([]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        clearErrors();

        const dataForValidation: INewMissionData = {
            name: name,
            description: description,
            location: location,
            activities: choosenActivities,
            status: status as TMissionStatuses,
            date: new Date().toISOString(),
        };

        const validationErrors = validateNewMissionFormData(dataForValidation);

        if (Object.keys(validationErrors).length > 0) {
            if (validationErrors.name) {
                setNameError(validationErrors.name);
            }

            if (validationErrors.description) {
                setDescriptionError(validationErrors.description);
            }

            if (validationErrors.location) {
                setLocationError(validationErrors.location);
            }

            if (validationErrors.status) {
                setStatusError(validationErrors.status);
            }

            return;
        }

        setIsCreating(true);
        axios
            .post("/api/event", dataForValidation, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                clearFields();
            })
            .catch((res) => console.log(res))
            .finally(() => setIsCreating(false));
    };

    return (
        <form
            className="flex max-w-[480px] flex-col pl-3 pt-5"
            onSubmit={handleSubmit}
        >
            <Label>Назва місії</Label>
            <Input
                variant="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
            />
            {nameError && (
                <span className="self-start pl-3 text-red-400">
                    {nameError}
                </span>
            )}

            <Label className="mt-4">Опис місії</Label>
            <Textarea
                variant="white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={descriptionError}
            />
            {descriptionError && (
                <span className="self-start pl-3 text-red-400">
                    {descriptionError}
                </span>
            )}

            <Label className="mt-4">Місце проведення</Label>
            <Input
                variant="white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={locationError}
            />
            {locationError && (
                <span className="self-start pl-3 text-red-400">
                    {locationError}
                </span>
            )}

            <Label className="mt-4 text-xl">Оберіть род занять</Label>
            <GroupCheckbox
                options={activities.map((activity) => {
                    return { id: activity.id, value: activity.name };
                })}
                selectedValues={choosenActivities}
                setSelectedValues={setchoosenActivities}
                border
            />

            <Select
                className="mt-4"
                options={missionStatuses}
                value={status}
                setValue={setStatus}
                placeholder="Оберіть статус"
                variant="white"
                error={statusError}
            />
            {statusError && (
                <span className="self-start pl-3 text-red-400">
                    {statusError}
                </span>
            )}

            <Button className="mt-4" size="lg" type="submit">
                Створити місію
            </Button>
        </form>
    );
};

export default NewMissionForm;