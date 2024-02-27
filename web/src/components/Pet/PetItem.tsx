import { Pet } from "@/@types/types";
import { petGender } from "@/helpers/pet";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { MdOutlineCake } from "react-icons/md";
import { PiPawPrintBold } from "react-icons/pi";
const icons = {
    true: <BsGenderMale />,
    false: <BsGenderFemale />,
};
export function PetItem({ pet }: { pet: Pet }) {
    const years =
        new Date().getFullYear() - new Date(pet.birthdate).getFullYear();
    return (
        <>
            <div className="flex gap-2 items-center">
                <PiPawPrintBold />
                <p>{pet.specie}</p>
            </div>
            <div className="flex gap-2 items-center">
                <MdOutlineCake />
                <p>
                    {new Date(pet.birthdate).toLocaleDateString()}, {years} anos
                </p>
            </div>
            <div className="flex gap-2 items-center">
                {icons[String(pet.sex) as keyof typeof icons]}
                <p>{petGender[String(pet.sex) as keyof typeof icons]}</p>
            </div>
        </>
    );
}
