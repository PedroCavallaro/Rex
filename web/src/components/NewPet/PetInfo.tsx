"use client";
import { Specie } from "@/@types/types";
import { Input } from "../Input";
import { MediaPicker } from "./MediaPicker";
import { Button } from "../Button";
import { Controller, useForm } from "react-hook-form";
import { promise, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useRef } from "react";
import { serverApi } from "@/lib/api";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { getUser } from "@/helpers/user";
import { PiPlus } from "react-icons/pi";

const petSchema = z.object({
    name: z.string().min(3),
    sex: z.string(),
    birthdate: z.coerce.date(),
    file: z.any(),
    castrated: z.string(),
    specie_id: z.string().uuid(),
});

type FormData = z.infer<typeof petSchema>;
const onSubmit = async ({
    birthdate,
    file,
    name,
    castrated,
    sex,
    specie_id,
}: FormData) => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let imageUrl;

    imageUrl = await new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                reject(error);
            },
            () => {
                imageUrl = getDownloadURL(uploadTask.snapshot.ref).then((url) =>
                    resolve(url)
                );
            }
        );
    });
    const user = getUser();
    await serverApi.post("pet/save", {
        userId: user?.id,
        pet: {
            name,
            sex,
            birthdate,
            picture_url: imageUrl,
            castrated,
            specie_id,
        },
    });
};
export default function PetInfo({ species }: { species: Specie[] }) {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        mode: "onTouched",
        resolver: zodResolver(petSchema),
    });
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <form
            ref={formRef}
            className="flex gap-2 "
            onSubmit={handleSubmit((data) => {
                onSubmit(data);
            })}
        >
            <div className="flex flex-col gap-2 ">
                <div className="flex  gap-2">
                    <Controller
                        control={control}
                        name="file"
                        render={({ field: { onChange } }) => (
                            <MediaPicker onChange={onChange} />
                        )}
                    />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="">
                            <p>Nome</p>
                            <Input placeholder="Rex" {...register("name")} />
                        </label>
                        <label htmlFor="" className="flex flex-col">
                            <p>Data de Nascimento</p>
                            <Input type="date" {...register("birthdate")} />
                        </label>
                        <label htmlFor="">
                            <p>Sexo</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="radio"
                                        value={"true"}
                                        {...register("sex")}
                                    />
                                    <p>Macho</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="radio"
                                        value={"false"}
                                        {...register("sex")}
                                    />
                                    <p>Femea</p>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="flex gap-10">
                    <label htmlFor="specie" className="flex flex-col gap-2">
                        <p>Espécie</p>
                        <select
                            id="specie"
                            defaultValue={"Escolha a Espécie"}
                            className="shadow-2xl "
                            {...register("specie_id")}
                        >
                            <option value="Escolha a Espécie" disabled hidden>
                                Escolha a Espécie
                            </option>
                            {species?.map(({ id, specie }, i) => {
                                return (
                                    <option key={id} value={id}>
                                        {specie}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    <label htmlFor="" className="">
                        <p>Castrado</p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    value={"true"}
                                    {...register("castrated")}
                                />
                                <p>Sim</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    {...register("castrated")}
                                    value={"false"}
                                />
                                <p>Nao</p>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Vacinas</p>
                    <div className="flex flex-col gap-4">
                        <div className=" flex gap-2">
                            <label htmlFor="">
                                <input
                                    type="text"
                                    className="border-[1px] border-black border-opacity-35 p-2 rounded-md"
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="date"
                                    className="border-[1px] border-black border-opacity-35 p-2 rounded-md w-[9rem]"
                                />
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button className="p-4 bg-green-turquise rounded-lg">
                                <PiPlus />
                            </button>
                            <p>Adicionar Vacina</p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 w-[95%]">
                    <button className="w-full bg-green-turquise rounded-lg p-3 text-white">
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}
