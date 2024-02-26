import { Pet } from "@/@types/types";
import Image from "next/image";
import { PiPawPrintBold } from "react-icons/pi";
import { MdOutlineCake } from "react-icons/md";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { petGender } from "@/helpers/pet";
import { Button } from "../Button";
const icons = {
    true: <BsGenderMale />,
    false: <BsGenderFemale />,
};

export default function PetCard({ pet }: { pet: Pet }) {
    return (
        <div className="flex flex-col shadow-2xl overflow-hidden py-5 ">
            <Image
                src={pet.picture_url}
                alt={pet.name}
                height={200}
                width={200}
                className="w-full h-[17rem] object-cover items-center flex justify-center"
            />
            <div className="flex flex-col w-[80%] gap-2">
                <p className="text-3xl font-bold">{pet.name}</p>
                <div className="flex gap-2 items-center">
                    <PiPawPrintBold />
                    <p>{pet.specie}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <MdOutlineCake />
                    <p>{new Date(pet.birthdate).toISOString()}</p>
                </div>
                <div className="flex gap-2 items-center">
                    {icons[String(pet.sex) as keyof typeof icons]}
                    <p>{petGender[String(pet.sex) as keyof typeof icons]}</p>
                </div>
                <Button text="Mais informações" />
            </div>
        </div>
    );
}
