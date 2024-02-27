"use client";

import { Pet } from "@/@types/types";
import { Button } from "@/components/Button";
import { PetItem } from "@/components/Pet/PetItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";

export default function Page() {
    const [pet, setPet] = useState<Pet[]>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const ls = localStorage.getItem("pets");
        setPet((prev) => (prev = JSON.parse(ls as string)));
    }, []);
    return (
        <main>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {pet && (
                <div className="flex flex-col gap-3 overflow-hidden">
                    <Image
                        src={pet[0].picture_url}
                        alt={pet[0].name}
                        width={1000}
                        height={1000}
                        className="w-full h-[18rem] object-cover"
                    />
                    <div className="px-2 flex flex-col gap-4">
                        <div className="flex gap-7 items-center ">
                            <p className="text-4xl font-light">{pet[0].name}</p>
                            <button className="bg-green-turquise w-[5rem] h-[3rem] rounded-lg items-center flex justify-center">
                                <BiPencil />
                            </button>
                        </div>
                        <div className="flex flex-col text-xl">
                            <PetItem pet={pet[0]} />
                        </div>
                        <div>
                            <p className="text-xl">Castrado</p>
                            <div className="shadow-2xl text-lg">
                                <p className="border-[1px] border-black border-opacity-35 p-2 rounded-md w-[4rem]">
                                    {pet[0].castrated ? "Sim" : "Nao"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xl">Vacinas</p>
                            <div className="flex flex-col gap-2">
                                <div className=" flex gap-2">
                                    <label htmlFor="">
                                        <input
                                            type="text"
                                            disabled
                                            defaultValue={"V8/V10"}
                                            className="border-[1px] border-black border-opacity-35 p-2 rounded-md"
                                        />
                                    </label>
                                    <label htmlFor="">
                                        <input
                                            type="text"
                                            disabled
                                            defaultValue={"15/10/2019"}
                                            className="border-[1px] border-black border-opacity-35 p-2 rounded-md w-[9rem]"
                                        />
                                    </label>
                                </div>
                                <div className=" flex gap-2">
                                    <label htmlFor="">
                                        <input
                                            type="text"
                                            disabled
                                            defaultValue={"Raiva"}
                                            className="border-[1px] border-black border-opacity-35 p-2 rounded-md"
                                        />
                                    </label>
                                    <label htmlFor="">
                                        <input
                                            type="text"
                                            disabled
                                            defaultValue={"17/08/2019"}
                                            className="border-[1px] border-black border-opacity-35 p-2 rounded-md w-[9rem]"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-10 flex w-[96%] overflow-hidden">
                            <button className="bg-green-turquise text-center text-white p-2 w-full rounded-md">
                                <p>Voltar para a página inicial</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
