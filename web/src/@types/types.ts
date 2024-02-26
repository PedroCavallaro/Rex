export type AuthType = "login" | "register";
export type AuthResponse = { token: string } & { message: string };
export type Pet = {
    id: string;
    name: string;
    sex: boolean;
    birthdate: Date;
    picture_url: string;
    castrated: boolean;
    specie: string;
};
export type Specie = {
    id: string;
    specie: string;
};
