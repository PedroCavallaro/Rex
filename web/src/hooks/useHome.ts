import { Pet } from "@/@types/types";
import { getUser } from "@/helpers/user";
import { serverApi } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";

async function getPets(): Promise<Pet[] | null> {
    const user = getUser();

    if (user) {
        const res = await serverApi.get(`pet/user/${user?.id}`);
        console.log(res.data);
        return res.data as Pet[];
    }
    return null;
}
export function useHome() {
    const [pets, setPets] = useState<Pet[] | null>();

    const handlePets = useCallback(async () => {
        const res = await getPets();
        localStorage.setItem("pets", JSON.stringify(res));
        setPets(res);
    }, []);

    useEffect(() => {
        handlePets();
    }, [handlePets]);

    return {
        pets,
    };
}
