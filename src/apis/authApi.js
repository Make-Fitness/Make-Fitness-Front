import { api } from "../configs/axiosConfig";

// ✅ 회원가입 API
export const joinApi = async (joinInfo) => {
    return api.post("/auth/signup", joinInfo);
};

// ✅ 로그인 API
export const loginApi = async (loginInfo) => {
    try {
        console.log("로그인 요청 데이터:", loginInfo); // 요청 데이터 확인

        const response = await api.post("/auth/signin", loginInfo);

        console.log("로그인 API 응답:", response.data); // 응답 확인

        // ✅ 토큰과 닉네임을 localStorage에 저장
        if (response.data.token) {
            localStorage.setItem("accessToken", response.data.token);
        }
        if (response.data.nickname) {
            localStorage.setItem("nickname", response.data.nickname);
        }
        if (response.data.roll_name) {
            localStorage.setItem("roll_name", response.data.roll_name);
        }

        return response;
    } catch (error) {
        console.error("로그인 API 에러:", error.response?.data || error);
        throw error;
    }
};

// ✅ 로그아웃 함수 올바르게 선언
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("roll_name");
};
