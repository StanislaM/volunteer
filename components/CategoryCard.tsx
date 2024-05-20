import { ICategoryCard } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

type Props = {} & ICategoryCard;

const CategoryCard = ({ id, icon, name, url }: Props) => {
    return (
        <Link
            href={`/missions?category=${url}`}
            className=" flex h-[80px] max-w-[240px] items-center justify-start gap-x-4 rounded-[20px] px-4 shadow-soft"
        >
            <Image
                alt="category-icon"
                src={`/category-icons/${icon}.svg`}
                width={46}
                height={46}
            />
            <span className="text-2xl font-normal text-gray-dark">{name}</span>
        </Link>
    );
};

export default CategoryCard;
