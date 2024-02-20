import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/providers/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "rex",
    description: "App para o seu pet",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
