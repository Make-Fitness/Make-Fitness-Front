import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:8080/",
    baseURL: "https://makefitness.store",
    
});

// 요청 인터셉터 추가 (AccessToken 자동 추가)
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 토큰을 로컬스토리지에 저장하는 함수
export const setTokenLocalStorage = (name, token) => {
    if (token) {
        localStorage.setItem(name, token);
    } else {
        localStorage.removeItem(name);
    }
};

// 기본 api 객체 내보내기 (named export & default export)
export { api };
export default api;
