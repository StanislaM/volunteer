"use client";

import GroupCheckbox from "@/components/ui/GroupCheckbox";
import H from "@/components/ui/H";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { TFilters } from "@/shared/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
    filters: TFilters;
    setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

const Filter = ({ filters, setFilters }: Props) => {
    const searchParams = useSearchParams();
    const [name, setName] = useState("");
    const [debounceName] = useDebounce(name, 500);

    const [activities, setActivities] = useState<
        { id: number; name: string }[]
    >([]);

    const [choosenActivities, setchoosenActivities] = useState<number[]>([]);

    useEffect(() => {
        axios
            .get("/api/activity-category", { withCredentials: true })
            .then((res) => setActivities(res.data))
            .catch((res) => console.log(res));
    }, []);

    useEffect(() => {
        setFilters({ ...filters, name: debounceName });
    }, [debounceName]);

    useEffect(() => {
        setFilters({ ...filters, activities: choosenActivities });
    }, [choosenActivities]);

    useEffect(() => {
        setchoosenActivities(
            activities
                .filter(
                    (activity) =>
                        activity.name === searchParams.get("category"),
                )
                .map((category) => category.id) || [],
        );
    }, [searchParams, activities]);

    return (
        <Suspense>
            <aside className="w-[350px] shrink-0">
                <div className="flex w-full flex-col rounded-[20px] border-[5px] border-main-color bg-white p-4">
                    <H type="h3" className="text-center">
                        Фільтри
                    </H>

                    <Input
                        variant="white"
                        placeholder="Назва"
                        className="mt-5"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Label className=" mt-4 text-xl">Род занять</Label>
                    <GroupCheckbox
                        border
                        options={activities.map((activity) => {
                            return { id: activity.id, value: activity.name };
                        })}
                        selectedValues={choosenActivities}
                        setSelectedValues={setchoosenActivities}
                    />
                </div>
            </aside>
        </Suspense>
    );
};

export default Filter;
