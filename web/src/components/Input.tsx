/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    readonly errors?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", ...props }, ref) => {
        return (
            <>
                <input
                    type={type}
                    className="h-10 rounded-md shadow-xl outline-none px-2 text-black"
                    ref={ref}
                    {...props}
                />
            </>
        );
    }
);
