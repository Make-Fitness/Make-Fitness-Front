/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { getAvailablePromotions } from "../../apis/reservationApi";

function Reservation() {
  const navigate = useNavigate();

  // 예약 선택용 상태들
  const [view, setView] = useState("dashboard"); // 현재 뷰: 'dashboard'만 사용 중
  const [promotionData, setPromotionData] = useState([]); // 프로모션 리스트
  const [selectedMembershipId, setSelectedMembershipId] = useState(null); // 선택된 멤버십

  // 유효 토큰 확인 + 프로모션 데이터 조회
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || typeof token !== "string" || token.length < 20) {
      console.error("유효하지 않은 토큰입니다. 다시 로그인하세요.");
      return;
    }

    getAvailablePromotions()
      .then((res) => {
        console.log("📦 프로모션 데이터:", res.data);
        setPromotionData(res.data || []);
      })
      .catch((err) => {
        console.error("강사 및 예약 정보 불러오기 실패", err);
      });
  }, []);

  // '예약하기' 버튼 클릭 시, 해당 멤버십 ID를 상태로 전달
  const handleReserveDashboard = (membershipId) => {
    setSelectedMembershipId(membershipId);
    navigate("/makefitness/reservations/daymanagement", {
      state: { selectedMembershipId: membershipId },
    });
  };

  // 메인 뷰 렌더링 (대시보드)
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
                <td css={s.tableCell}>
                  <button
                    onClick={() => handleReserveDashboard(item.membershipId)}
                    css={s.reserveButton}
                  >
                    예약하기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div />;
}

export default Reservation;
