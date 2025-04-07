import axiosInstance from "./axiosInstance";

// 예약 가능한 프로모션 목록 조회
export const getAvailablePromotions = () => {
  return axiosInstance.get("/api/makefitness/reservations/available-promotions");
};

// 예약 가능한 클래스 리스트 조회
export const getReservableClasses = (membershipId) => {
  return axiosInstance.get("/api/makefitness/classes/reservable", {
    params: { membershipId },
  });
};

// 오늘 예약된 수업 조회
export const getTodayReservations = (membershipId) => {
  return axiosInstance.get("/api/makefitness/reservation/today", {
    params: { membershipId },
  });
};

// 과거 예약 이력 조회 
export const getReservationHistory = (membershipId) => {
  return axiosInstance.get("/api/makefitness/reservation/history", {
    params: { membershipId },
  });
};

// 수업 예약
export const reserveClass = (classId, membershipId) => {
  return axiosInstance.post("/api/makefitness/reservation", {
    classId,
    membershipId,
  });
};

// 예약 취소
export const cancelReservation = (reservationId) => {
  return axiosInstance.delete(`/api/makefitness/reservations/${reservationId}`);
};
