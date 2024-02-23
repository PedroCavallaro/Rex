"use client";
import { Specie } from "@/@types/types";
import { Input } from "../Input";
import { MediaPicker } from "./MediaPicker";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useRef } from "react";
import { serverApi } from "@/lib/api";

const petSchema = z.object({
    name: z.string().min(3),
    sex: z.string(),
    birthdate: z.coerce.date(),
    castrated: z.string(),
    specie_id: z.string().uuid(),
});

const onSubmit = async (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const picture = formData.get("picture_url");

    formData.append("file", picture);

    await serverApi.post(
        "pet/image",
        {
            formData,
        },
        {}
    );
};

type FormData = z.infer<typeof petSchema>;
export default function PetInfo({ species }: { species: Specie[] }) {
    const {
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
                onSubmit(formRef.current!);
            })}
        >
            <div className="flex flex-col gap-2 ">
                <div className="flex  gap-2">
                    <MediaPicker />
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

                <Button type="submit" text="Salvar" />
            </div>
        </form>
    );
}
