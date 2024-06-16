import Button from "@/components/ui/Button";
import H from "@/components/ui/H";
import Input from "@/components/ui/Input";
import React from "react";

type Props = {};

const Filter = (props: Props) => {
    return (
        <aside className="w-[350px] shrink-0">
            <div className="flex w-full flex-col rounded-[20px] border-[5px] border-main-color bg-white p-4">
                <H type="h3" className="text-center">
                    Фільтри
                </H>

                <Input variant="white" placeholder="Назва" className="mt-5" />
            </div>
        </aside>
    );
};

export default Filter;
