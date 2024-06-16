"use client";

import H from "@/components/ui/H";
import Input from "@/components/ui/Input";
import { TFilters } from "@/shared/types";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
    filters: TFilters;
    setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

const Filter = ({ filters, setFilters }: Props) => {
    const [name, setName] = useState("Missio");
    const [debounceName] = useDebounce(name, 500);

    useEffect(() => {
        setFilters({ ...filters, name: debounceName });
    }, [debounceName]);

    return (
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
            </div>
        </aside>
    );
};

export default Filter;
