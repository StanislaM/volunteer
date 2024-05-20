"use client";

import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/Container";
import H from "@/components/ui/H";
import { staticData } from "@/shared/staticData";
import { ICategoryCard } from "@/shared/types";
import { useEffect, useState } from "react";

const serverData: ICategoryCard[] = [
    {
        id: "1",
        icon: "money",
        name: "Збір коштів",
        url: "money",
    },
    {
        id: "2",
        icon: "money",
        name: "Збір коштів",
        url: "money",
    },
    {
        id: "3",
        icon: "money",
        name: "Збір коштів",
        url: "money",
    },
    {
        id: "4",
        icon: "money",
        name: "Збір коштів",
        url: "money",
    },
    {
        id: "5",
        icon: "money",
        name: "Збір коштів",
        url: "money",
    },
    {
        id: "6",
        icon: "money",
        name: "Військова допомога",
        url: "money",
    },
];

type Props = {};

const Categories = (props: Props) => {
    const [categories, setCategories] = useState<ICategoryCard[]>([]);

    useEffect(() => {
        //fetch data...

        setCategories(serverData);
    }, []);

    return (
        <section className="pb-[50px] pt-[30px]">
            <Container>
                <span className="-mb-3 block text-center text-3xl font-light">
                    {staticData.categoriesSection.sectionSubtitle}
                </span>
                <H type="h2" className="text-center">
                    {staticData.categoriesSection.sectionTitle}
                </H>

                <div className="mx-auto mt-8 flex max-w-[850px] flex-wrap items-center justify-center gap-x-[50px] gap-y-16">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} {...category} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Categories;
