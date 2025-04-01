// ✅ Reservations.jsx
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { css } from "@emotion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();

  const [view, setView] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [instructorId, setInstructorId] = useState(null);
  const [classData, setClassData] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [selectedMembershipId, setSelectedMembershipId] = useState(null); // ✅ 추가

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  const instructorImageMap = {
    1: "../Trainer/park.jpeg",
    2: "../Trainer/jang.jpg",
    3: "../Trainer/kang.jpg",
    4: "../Trainer/shin.jpg",
    5: "../Trainer/kim.jpg",
  };

  // 프로모션 데이터 API 호출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || typeof token !== "string" || token.length < 20) {
      console.error("유효하지 않은 토큰입니다. 다시 로그인하세요.");
      return;
    }

    axios
      .get("/api/makefitness/reservations/available-promotions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("프로모션 데이터:", res.data);
        setPromotionData(res.data || []);
      })
      .catch((err) => {
        console.error("강사 및 예약 정보 불러오기 실패", err);
      });
  }, []);

  const handleReserveDashboard = (membershipId) => {
    setSelectedMembershipId(membershipId);
    navigate("/makefitness/manager/daymanagement", {
      state: { selectedMembershipId: membershipId },
    });
  };

  const handleCancelDashboard = (id) => {
    console.log("대시보드 예약 취소, id =", id);
  };

  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  const handleCancelReservation = (id) => {
    console.log("예약 관리 페이지 예약 취소, id =", id);
  };

  if (view === "dashboard") {
    return (
      <div css={s.container}>
        <h1 css={s.title}>내 프로모션 관리</h1>
        <table
          css={css`
            width: 100%;
            border-collapse: collapse;
            margin-top: 2rem;
            color: white;
          `}
        >
          <thead>
            <tr>
              <th css={s.tableHeader}>내프로모션</th>
              <th css={s.tableHeader}>강사이름</th>
              <th css={s.tableHeader}>남은세션</th>
              <th css={s.tableHeader}>만료일</th>
              <th css={s.tableHeader}>확인</th>
            </tr>
          </thead>
          <tbody>
            {promotionData.map((item) => (
              <tr key={item.membershipId}>
                <td css={s.tableCell}>{item.promotionName}</td>
                <td css={s.tableCell}>{item.trainerName}</td>
                <td css={s.tableCell}>{item.remainingSessionCount}회</td>
                <td css={s.tableCell}>
                  {item.expiredDate
                    ? new Date(item.expiredDate).toLocaleDateString("ko-KR")
                    : "없음"}
                </td>
                <td css={s.tableCell} style={{ textAlign: "right" }}>
                  <button onClick={() => handleReserveDashboard(item.membershipId)} css={s.button}>
                    예약하기
                  </button>
                  <button onClick={() => handleCancelDashboard(item.membershipId)} css={s.button}>
                    예약 취소
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div />; // 생략 가능: 예약 페이지는 daymanagement에서 처리
}

export default Reservation;
