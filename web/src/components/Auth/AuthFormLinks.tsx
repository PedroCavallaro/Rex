import { AuthType } from "@/@types/types";
import Link from "next/link";

export function AuthFormLinks({ type }: { type: AuthType }) {
    const text = {
        login: {
            href: "/auth/register",
            title: "Nao tem uma conta?",
            type: " Cadastre-se",
        },
        register: {
            href: "/auth/login",
            title: "Ja tem uma conta?",
            type: " Fazer Login",
        },
    };
    const { href, title, type: formType } = text[type];

    return (
        <span className="mt-5  text-black dark:text-gray-700 text-sm ">
            {title}
            <Link href={href} className="text-green-turquise">
                {formType}
            </Link>
        </span>
    );
}
