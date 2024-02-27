"use client";
import PetCard from "@/components/Home/PetCard";
import PetSection from "@/components/Home/PetSection";
import { getUser } from "@/helpers/user";
import { useHome } from "@/hooks/useHome";

export default function Home() {
    const { pets } = useHome();
    const user = getUser();

    return (
        <main className="flex flex-col p-4 gap-10 ">
            <p className="text-3xl flex gap-2 mt-5">
                Olá <span className="font-bold">{user?.name}</span>
            </p>
            <PetSection>
                {pets &&
                    pets?.map((pet, i) => {
                        return <PetCard key={i} pet={pet} />;
                    })}
            </PetSection>
        </main>
    );
}
