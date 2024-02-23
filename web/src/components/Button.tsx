import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
};
export const Button = ({ type = "button", text, ...props }: ButtonProps) => {
    return (
        <button
            className="bg-green-turquise text-center text-white p-2 rounded-md"
            type={type}
            {...props}
        >
            {text}
        </button>
    );
};
