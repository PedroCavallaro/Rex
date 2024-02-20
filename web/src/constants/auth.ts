import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "O nome precisa ser maior"),
    email: z.string().email("Email inválido"),
    password: z
        .string()
        .min(8, "Minimo 8 caracteres")
        .max(64, "Maximo de 64 caracteres atingido"),
});
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z
        .string()
        .min(8, "Minimo 8 caracteres")
        .max(64, "Maximo de 64 caracteres atingido"),
});
