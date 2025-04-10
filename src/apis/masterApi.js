// src/api/worker.js
import axios from "axios";

// 근무자 실적 조회
export const getWorkers = async ({ year, month }) => {
  const token = localStorage.getItem("accessToken");
  const classTime = `${year}-${month}-01`;

  const response = await axios.get("/api/makefitness/admin/manager", {
    params: { classTime },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 회원 전체 조회
export const getMembers = async () => {
  const response = await axios.get("/api/makefitness/admin/users");
  return response.data;
};

// 회원 권한 변경
export const updateMemberRole = async ({ userId, roleName }) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.put(
    `/api/makefitness/admin/users/${userId}/role`,
    { userId, roleName },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
