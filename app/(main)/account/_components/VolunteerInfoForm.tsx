"use client";

import ConfirmIcon from "@/components/icons/ConfirmIcon";
import PenIcon from "@/components/icons/PenIcon";
import XMarkIcon from "@/components/icons/XMarkIcon";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import GroupCheckbox from "@/components/ui/GroupCheckbox";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { autoLogin } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { IVolunteerData } from "@/shared/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {} & IVolunteerData;

const VolunteerInfoForm = (volunteerInfo: Props) => {
    const dispatch = useDispatch() as AppDispatch;

    const [organizationName, setOrganizationName] = useState(
        volunteerInfo.organizationName,
    );
    const [isSolo, setIsSolo] = useState(volunteerInfo.isSolo);
    const [activities, setActivities] = useState<
        { id: number; name: string }[]
    >([]);
    const [choosenActivities, setChoosenActivities] = useState<number[]>(
        volunteerInfo.activities.map((activity) => activity.id) || [],
    );
    const [prevInfo, setPrevInfo] = useState<
        | Partial<Omit<IVolunteerData, "activities"> & { activities: number[] }>
        | undefined
    >(undefined);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = () => {
        const dataForValidation: Partial<
            Omit<IVolunteerData, "activities"> & { activities: number[] }
        > = {
            organizationName: organizationName,
            activities: choosenActivities,
            isSolo: isSolo,
        };

        axios
            .patch("/api/volunteer/me", dataForValidation, {
                withCredentials: true,
            })
            .then(() => {
                setIsEditing(false);
                dispatch(autoLogin());
            })
            .catch((res) => {
                console.log(res);
                cancelEditing();
            });
    };

    const changeEditing = () => {
        if (isEditing) {
            handleSubmit();
            return;
        }

        setPrevInfo({
            organizationName,
            activities: choosenActivities,
            isSolo,
        });
        setIsEditing((state) => !state);
    };

    const cancelEditing = () => {
        setOrganizationName(prevInfo?.organizationName || "");
        setChoosenActivities(prevInfo?.activities || []);
        setIsSolo(prevInfo?.isSolo || false);

        setIsEditing(false);
    };

    useEffect(() => {
        axios
            .get("/api/activity-category", { withCredentials: true })
            .then((res) => setActivities(res.data))
            .catch((res) => console.log(res));
    }, []);

    return (
        <form className="flex w-[480px] flex-col pl-3 pt-5">
            <Label>{isSolo ? "Ім'я волонтера" : "Назва організації"}</Label>
            <Input
                variant="white"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                disabled={!isEditing}
            />

            <Checkbox
                className="mt-4"
                title="Я планую допомагати сам"
                isChecked={isSolo}
                setIsChecked={setIsSolo}
                disabled={!isEditing}
            />

            <Label className="mt-4">Род занять</Label>
            <GroupCheckbox
                options={activities.map((activity) => {
                    return { id: activity.id, value: activity.name };
                })}
                disabled={!isEditing}
                selectedValues={choosenActivities}
                setSelectedValues={setChoosenActivities}
            />

            <div className="mt-6 flex gap-x-4 ">
                <Button
                    className="w-min rounded-[8px]"
                    variant="default"
                    type="button"
                    onClick={changeEditing}
                >
                    {isEditing ? (
                        <div className="flex items-center gap-x-1">
                            <ConfirmIcon />
                            Підтвердити
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-1">
                            <PenIcon />
                            Редагувати
                        </div>
                    )}
                </Button>

                {isEditing && (
                    <Button
                        className="w-min rounded-[8px]"
                        variant="accent"
                        type="button"
                        onClick={cancelEditing}
                    >
                        <div className="flex items-center gap-x-1">
                            <XMarkIcon />
                            Скасувати
                        </div>
                    </Button>
                )}
            </div>
        </form>
    );
};

export default VolunteerInfoForm;
