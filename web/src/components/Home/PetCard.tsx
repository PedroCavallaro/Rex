"use client";
import { Pet } from "@/@types/types";
import Image from "next/image";
import { PiPawPrintBold } from "react-icons/pi";
import { MdOutlineCake } from "react-icons/md";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { petGender } from "@/helpers/pet";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
import { PetItem } from "../Pet/PetItem";
const icons = {
    true: <BsGenderMale />,
    false: <BsGenderFemale />,
};

export default function PetCard({ pet }: { pet: Pet }) {
    const router = useRouter();

    return (
        <div className="flex flex-col shadow-2xl overflow-hidden py-5 rounded-lg  ">
            <Image
                src={pet.picture_url}
                alt={pet.name}
                height={200}
                width={200}
                className="w-full h-[17rem] object-cover items-center flex justify-center  rounded-lg"
            />
            <div className="flex flex-col w-[80%] gap-2">
                <p className="text-3xl font-bold">{pet.name}</p>
                <PetItem pet={pet} />
                <Button
                    text="Mais informações"
                    onClick={() => router.push(`/pet/${pet.id}`)}
                />
            </div>
        </div>
    );
}
