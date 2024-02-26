"use client";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import { forwardRef, useState } from "react";

interface MediaPickerProps {
    errors?: string;
    onChange: (file: File) => any;
}

// eslint-disable-next-line react/display-name
export const MediaPicker = forwardRef<HTMLInputElement, MediaPickerProps>(
    ({ errors, onChange }, ref) => {
        const [imagePreview, setImagePreview] = useState<string>();
        return (
            <>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <label
                        htmlFor="image"
                        className="w-36 h-36 bg-black bg-opacity-30 rounded-full flex justify-center items-center overflow-hidden relative"
                    >
                        <input
                            type="file"
                            id="image"
                            ref={ref}
                            onChange={(e) => {
                                const files = e.currentTarget.files;
                                if (files) {
                                    console.log(files[0]);
                                    setImagePreview(
                                        (prev) =>
                                            (prev = URL.createObjectURL(
                                                files[0]
                                            ))
                                    );
                                    onChange && onChange(files[0]);
                                }
                            }}
                            className="hidden absolute"
                        />
                        {!imagePreview && (
                            <GoPlus size={100} className="opacity-80 z-20" />
                        )}
                        <Image
                            src={
                                imagePreview
                                    ? imagePreview
                                    : "/icons/cachorro.png"
                            }
                            alt="cachorro"
                            width={100}
                            height={100}
                            className={`absolute z-10  object-fill ${
                                imagePreview
                                    ? "w-full opacity-100"
                                    : "w-24 opacity-50"
                            }`}
                        />
                    </label>
                    <p className="text-sm mt-3 font-light">Escolha uma foto</p>
                </div>
            </>
        );
    }
);
