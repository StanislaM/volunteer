import H from "@/components/ui/H";
import React, { Suspense } from "react";
import NewMissionForm from "../../_components/NewMissionForm";
import Separator from "@/components/ui/Separator";

type Props = {};

const CreateNewMissionPage = (props: Props) => {
    return (
        <div>
            <H type="h3" className="text-center">
                Створення нової місії
            </H>

            <Separator />

            <Suspense>
                <NewMissionForm />
            </Suspense>
        </div>
    );
};

export default CreateNewMissionPage;
