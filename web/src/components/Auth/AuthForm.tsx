"use client";
import { AuthFormLinks } from "./AuthFormLinks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthType } from "@/@types/types";
import { Input } from "../Input";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export function AuthForm({ type }: { type: AuthType }) {
    const { onSubmit, authFormInfo } = useAuth();

    type FormData = { email: string; password: string } & {
        type: "register";
        name: string;
    };

    console.log(authFormInfo);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(authFormInfo[type].schema),
    });

    return (
        <form
            className="w-[20rem] h-[22rem] flex flex-col  gap-5  "
            onSubmit={handleSubmit(({ email, name, password }) =>
                onSubmit(type, email, password, name)
            )}
        >
            <div className="relative">
                <Image
                    src={"/icons/gato.png"}
                    alt="gato"
                    width={100}
                    height={100}
                    className="absolute -top-36 -right-5"
                />
            </div>
            {type === "register" && (
                <Input
                    {...register("name")}
                    errors={errors.name?.message}
                    placeholder="Nome"
                />
            )}

            <Input
                id="email"
                {...register("email")}
                errors={errors.email?.message}
                placeholder="Email"
            />

            <Input
                id="password"
                {...register("password")}
                errors={errors.password?.message}
                placeholder="Senha"
            />
            <button
                type="submit"
                className="text-white  bg-green-turquise focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
                {authFormInfo[type].buttonText}
            </button>

            <AuthFormLinks type={type} />
        </form>
    );
}
