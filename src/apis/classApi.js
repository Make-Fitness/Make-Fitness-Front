// apis/classApi.js
import axiosInstance from "./axiosInstance";

// 수업 주제 및 수업 타입 가져오기
export const fetchClassSubject = () => {
  return axiosInstance.get("/api/makefitness/subject/me");
};

// 오늘 날짜 기준 등록된 수업과 예약자 정보 가져오기
export const fetchTodayClasses = () => {
  return axiosInstance.get("/api/makefitness/classes/with-reservations");
};

// 특정 날짜에 등록된 수업 시간 가져오기
export const fetchRegisteredTimes = (dateStr) => {
  return axiosInstance.get(`/api/makefitness/classes/registered-times?date=${dateStr}`);
};

// 수업 등록
export const createClass = (payload) => {
  return axiosInstance.post("/api/makefitness/classes", payload);
};

// 수업 삭제
export const deleteClass = (classId) => {
  return axiosInstance.delete(`/api/makefitness/classes/${classId}`);
};
