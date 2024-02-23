import PetInfo from "@/components/NewPet/PetInfo";
import { serverApi } from "@/lib/api";

const getSpecies = async () => {
    const res = await serverApi.get("pet/species");

    return res.data;
};

export default async function NewPet() {
    const species = await getSpecies();
    return (
        <main className="p-2 flex flex-col gap-5">
            <p className="text-4xl font-light">Adicionar Pet</p>
            <div>
                <PetInfo species={species} />
            </div>
        </main>
    );
}
