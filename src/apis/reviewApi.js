import axios from "axios";

const BASE_URL = "https://makefitness.store/api/makefitness/review";

// 토큰 유효성 검사 함수
const isValidToken = (token) => {
  return token && token.split(".").length === 3;
};

// 리뷰 목록 불러오기
export const fetchReviews = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const headers = token && isValidToken(token)
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.get(BASE_URL, { headers });

    // 방어적 처리
    const raw = response.data;
    const reviews = Array.isArray(raw) ? raw : raw?.data ?? [];

    return reviews;
  } catch (error) {
    console.error("리뷰 목록 불러오기 실패:", error);
    return []; // 에러 시 빈 배열 반환
  }
};

// 리뷰 등록
export const postReview = async (reviewData) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!isValidToken(token)) {
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
    console.error("리뷰 등록 실패:", error);
    throw error;
  }
};
