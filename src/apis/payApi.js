// src/apis/payApi.js
import axios from "./axiosInstance";

/**
 * 헬스 멤버십 결제 정보 전송 API
 * @param {Object} payload - 결제 관련 데이터 (reqMembershipDto + reqPayDto)
 * @returns {Promise} 서버 응답
 */
export const postHealthPayment = async (payload) => {
  const response = await axios.post("/api/makefitness/pay", payload);
  return response.data;
};
