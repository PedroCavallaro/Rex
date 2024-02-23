import { AuthType } from "@/@types/types";
import { AuthForm } from "@/components/Auth/AuthForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import lte from "../../../../public/left-triangle.svg";

export default function page({ params }: { params: { type: AuthType } }) {
    if (params.type !== "register" && params.type !== "login") {
        redirect("/");
    }
    if (cookies().get("token")) {
        redirect("/");
    }
    const title = params.type === "login" ? "Fazer login" : "Criar conta";
    return (
        <>
            <div className="flex items-center justify-center fixed top-0 h-full w-full  bg-white">
                <Image
                    src={lte}
                    width={500}
                    height={500}
                    alt=""
                    loading="eager"
                    className="fixed top-0 z-10 w-[100dvw] lg:w-[60dvw] right-0"
                />
                <div className="px-4 py-6 rounded-md  border-opacity-50 text-black  shadow-2xl bg-[#e6e4e4] z-30">
                    <h2 className="text-2xl font-light  mb-5">{title}</h2>
                    <AuthForm type={params.type} />
                </div>
                <Image
                    src={"/icons/cachorro.png"}
                    alt="cachorro"
                    width={100}
                    height={100}
                    className="absolute bottom-10  left-3 z-10"
                />

                <div className="absolute bottom-0 left-0  rotate-180">
                    <Image
                        src={lte}
                        width={100}
                        height={100}
                        alt=""
                        loading="eager"
                    />
                </div>
            </div>
        </>
    );
}
