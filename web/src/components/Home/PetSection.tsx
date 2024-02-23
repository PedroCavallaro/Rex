import { ReactNode } from "react";
import { Button } from "../Button";
import Link from "next/link";

export default function PetSection({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p className="text-xl">Meus Pets</p>
                <Link
                    href={"/new"}
                    className="bg-green-turquise text-center text-white p-2 rounded-md"
                >
                    Adicionar pet
                </Link>
            </div>

            {children}
        </div>
    );
}
