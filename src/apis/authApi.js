import { api } from "../configs/axiosConfig";

// ✅ 회원가입 API
export const joinApi = async (joinInfo) => {
    return api.post("/auth/signup", joinInfo);
};

// ✅ 로그인 API
export const loginApi = async (loginInfo) => {
    try {
        const response = await api.post("/api/auth/signin", loginInfo);

        const { nickname, token, role_name, roleName } = response.data;

        if (token) {
            localStorage.setItem("accessToken", token);
        }
        if (nickname) {
            localStorage.setItem("nickname", nickname);
        }

        // ✅ roleName을 최종적으로 저장
        const finalRole = roleName || role_name; 
        if (finalRole) {
            localStorage.setItem("roleName", finalRole);
        }

        console.log("로그인 성공 - 저장된 roleName:", finalRole);

        return response;
    } catch (error) {
        console.error("로그인 API 에러:", error.response?.data || error);
        throw error;
    }
};

// ✅ 로그아웃 함수
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("roleName");
};
