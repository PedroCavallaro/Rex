import axios from "axios";

export const serverApi = axios.create({
    baseURL: "http://localhost:3001/",
});

export const clientApi = axios.create({
    baseURL: "http://localhost:3000/",
});
