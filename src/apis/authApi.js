import { api } from "../configs/axiosConfig";


export const joinApi = async (joinInfo) => {
    return await api.post("/auth/signup", joinInfo);
}
