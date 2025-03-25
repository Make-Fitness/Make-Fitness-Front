import axios from "axios";

const BASE_URL = "http://localhost:8080/api/makefitness/review";

// ✅ 토큰 유효성 검사 함수
    const isValidToken = (token) => {
    return token && token.split(".").length === 3;
};

// ✅ 리뷰 목록 불러오기 (GET) — 누구나 가능
    export const fetchReviews = async () => {
    try {
        const token = localStorage.getItem("accessToken");

        const headers = token && isValidToken(token)
        ? { Authorization: `Bearer ${token}` }
        : {};

        const response = await axios.get(BASE_URL, { headers });

        return response.data;
    } catch (error) {
        console.error("리뷰 목록을 불러오는 중 오류 발생:", error);
        throw error;
    }
    };

    // ✅ 리뷰 등록 (POST) — 로그인 + 고객만 가능
    export const postReview = async (reviewData) => {
    try {
        const token = localStorage.getItem("accessToken");

        if (!isValidToken(token)) {
        console.warn("유효하지 않은 토큰으로 인해 리뷰 등록 요청이 차단되었습니다.");
        throw new Error("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
        }

        const response = await axios.post(BASE_URL, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });

        return response.data;
    } catch (error) {
        console.error("리뷰 저장 중 오류 발생:", error);
        throw error;
    }
};
