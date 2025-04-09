import { api } from "../configs/axiosConfig";

// 회원가입 API
export const joinApi = async (joinInfo) => {
    return api.post("api/auth/signup", joinInfo);
};

// 로그인 API
export const loginApi = async (loginInfo) => {
  try {
    const response = await api.post("/api/auth/signin", loginInfo);
    // 백엔드 응답(RespLoginDto) 예시:
    // {
    //   type: "JWT",
    //   name: "AccessToken",
    //   token: "...",
    //   nickname: "홍길동",
    //   ph: "010-1234-5678",
    //   roleName: "ROLE_USER",
    //   customer: { ... }  // 고객(회원권) 정보가 포함되어 있을 수 있음
    // }
    const { nickname, token, role_name, roleName, ph, customer, classstatus } = response.data;

    if (token) {
      localStorage.setItem("accessToken", token);
    }
    if (nickname) {
      localStorage.setItem("nickname", nickname);
    }
    if (ph) {
      localStorage.setItem("ph", ph);
    }
    // 고객 정보에서 회원권 관련 값을 저장
    // 예를 들어, customer 객체에 membership 필드가 있다면:
    if (customer && customer.membership) {
      localStorage.setItem("classstatus", customer.classstatus);
    } else {
      localStorage.setItem("classstatus", "");
    }

    // roleName을 최종적으로 저장
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

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("nickname");
  localStorage.removeItem("roleName");
  localStorage.removeItem("ph");
  localStorage.removeItem("classstatus");
};
