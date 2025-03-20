import { api } from "../configs/axiosConfig";

export const joinApi = async (joinInfo) => {
    return api.post("/auth/signup", joinInfo);
};

export const loginApi = async (loginInfo) => {
    try {
        console.log("로그인 요청 데이터:", loginInfo); 

        const response = await api.post("/auth/signin", loginInfo);

        console.log("로그인 API 응답:", response.data); 

        if (response.data.token) {
            localStorage.setItem("accessToken", response.data.token);
        }
        if (response.data.nickname) {
            localStorage.setItem("nickname", response.data.nickname);
        }
        if (response.data.rollName) {
            localStorage.setItem("rollName", response.data.rollName);
        }

        return response;
    } catch (error) {
        console.error("로그인 API 에러:", error.response?.data || error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("rollName");
};
