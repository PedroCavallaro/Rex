import { AuthType } from "@/@types/types";
import { loginSchema, registerSchema } from "@/constants/auth";
import { clientApi } from "@/lib/api";
import { ReactNode, createContext, useContext } from "react";
import { ZodType } from "zod";

interface AuthContextProps {
    authFormInfo: AuthFormInformation;
    onSubmit: (
        type: AuthType,
        email: string,
        password: string,
        name: string
    ) => Promise<void>;
}
type AuthFormInformation = {
    [key in AuthType]: {
        schema: ZodType<any, any, any>;
        buttonText: string;
    };
};

const AuthContext = createContext({} as AuthContextProps);

const authFormInfo: AuthFormInformation = {
    login: {
        schema: loginSchema,
        buttonText: "Entrar",
    },
    register: {
        schema: registerSchema,
        buttonText: "Cadastrar",
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const onSubmit = async (
        type: AuthType,
        email: string,
        password: string,
        name: string
    ) => {
        const res = await clientApi.post(`api/${type}`, {
            email,
            password,
            name,
        });
        if (res.data.message) {
            return;
        }
        window.location.href = "http://localhost:3000";
    };

    return (
        <AuthContext.Provider value={{ authFormInfo, onSubmit }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
