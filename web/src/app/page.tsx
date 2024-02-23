import { Pet } from "@/@types/types";
import PetSection from "@/components/Home/PetSection";
import { getUser } from "@/helpers/user";
import { serverApi } from "@/lib/api";

async function getPets(): Promise<Pet[] | null> {
    const user = getUser();

    if (user) {
        const res = await serverApi.get(`pet/user/${user?.id}`);

        return res.data as Pet[];
    }
    return null;
}

export default async function Home() {
    const pets = await getPets();
    console.log(pets);
    return (
        <main className="flex flex-col p-4 gap-10 ">
            <span className="text-3xl flex gap-2 mt-5">
                Olá <p className="font-bold">Pedro</p>
            </span>
            <PetSection>
                {pets?.map(({}, i) => {
                    return <div key={i}>oi</div>;
                })}
            </PetSection>
        </main>
    );
}
