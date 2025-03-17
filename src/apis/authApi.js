import { api } from "../configs/axiosConfig";

// 회원가입 API
export const joinApi = async (joinInfo) => {
    return api.post("/auth/signup", joinInfo);
};