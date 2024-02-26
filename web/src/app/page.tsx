"use client";
import PetCard from "@/components/Home/PetCard";
import PetSection from "@/components/Home/PetSection";
import { useHome } from "@/hooks/useHome";

export default function Home() {
    const { pets } = useHome();
    return (
        <main className="flex flex-col p-4 gap-10 ">
            <span className="text-3xl flex gap-2 mt-5">
                Olá <p className="font-bold">Pedro</p>
            </span>
            <PetSection>
                {pets &&
                    pets?.map((pet, i) => {
                        return <PetCard key={i} pet={pet} />;
                    })}
            </PetSection>
        </main>
    );
}
