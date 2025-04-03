// src/apis/salesApi.js
import axios from "./axiosInstance";

/**
 * 매출 데이터 조회 API
 * @param {string} startDate - 조회 시작일 (YYYY-MM-DD)
 * @param {string} endDate - 조회 종료일 (YYYY-MM-DD)
 * @returns {Promise<Array>} 매출 데이터 배열
 */
export const fetchSalesReport = async (startDate, endDate) => {
  const response = await axios.get("/api/makefitness/admin/sales/reports", {
    params: { startDate, endDate },
  });

  return response.data; // 이 부분은 실제 응답 형태에 따라 조정 가능
};
