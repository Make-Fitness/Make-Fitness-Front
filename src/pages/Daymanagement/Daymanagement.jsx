/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { useLocation } from "react-router-dom";

function Daymanagement() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const [reservableClasses, setReservableClasses] = useState([]);
  const [todayReservations, setTodayReservations] = useState([]);
  const [selectedDateReservations, setSelectedDateReservations] = useState([]);

  const location = useLocation();

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  useEffect(() => {
    const state = location.state;
    if (state?.selectedMembershipId) {
      setSelectedMembershipId(state.selectedMembershipId);
    }
  }, [location]);

  // 예약 가능한 수업 조회
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedMembershipId) return;

    axios
      .get("/api/makefitness/classes/reservable", {
        headers: { Authorization: `Bearer ${token}` },
        params: { membershipId: selectedMembershipId },
      })
      .then((res) => {
        console.log("📆 캘린더 예약 가능 수업:", res.data);
        setReservableClasses(res.data || []);

        // 캘린더 표시용 데이터 구성
        const grouped = {};
        (res.data || []).forEach((item) => {
          const date = item.classTime.split("T")[0];
          grouped[date] = (grouped[date] || []).concat({
            time: item.classTime,
            trainer: item.trainerName,
            subject: item.classSubject,
          });
        });
        setScheduleData(grouped);
      })
      .catch((err) => console.error("❌ 예약 가능 수업 로드 실패", err));
  }, [selectedMembershipId]);

  // 오늘 예약 내역 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedMembershipId) return;

    axios
      .get("/api/makefitness/reservation/today", {
        headers: { Authorization: `Bearer ${token}` },
        params: { membershipId: selectedMembershipId },
      })
      .then((res) => setTodayReservations(res.data || []))
      .catch((err) => console.error("❌ 오늘 예약 로딩 실패", err));
  }, [selectedMembershipId]);

  // 날짜 클릭 시 해당 날짜의 수업 필터링
  useEffect(() => {
    const selectedDateStr = currentDate.toISOString().split("T")[0];
    const filtered = reservableClasses.filter((cls) =>
      cls.classTime.startsWith(selectedDateStr)
    );
    setSelectedDateReservations(filtered);
  }, [currentDate, reservableClasses]);

  const handleReserveClass = async (classId) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedMembershipId) return;

    try {
      await axios.post(
        "/api/makefitness/reservation",
        { classId, membershipId: selectedMembershipId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ 예약 성공!");
      window.location.reload();
    } catch (err) {
      console.error("❌ 예약 실패", err);
      alert("예약 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 관리 (매니저 모드)</h1>
      <p css={s.description}>수업 등록 및 캘린더 기반 예약 관리</p>

      <div css={s.contentWrapper}>
        <div css={s.box}>
          <Calendar
            scheduleColor={colorMap[selectedClass]}
            isEditable={false}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            setCurrentDate={setCurrentDate}
          />
        </div>

        <div css={s.reservationListWrapper}>
          <h5>{currentDate.toISOString().split("T")[0]} 예약 가능한 수업</h5>
          {selectedDateReservations.length === 0 ? (
            <p>예약 가능한 수업이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {selectedDateReservations.map((item, i) => (
                <li key={i} css={s.reservationItem}>
                  {new Date(item.classTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <button
                    onClick={() => handleReserveClass(item.classId)}
                    style={{ marginLeft: "1rem" }}
                  >
                    예약하기
                  </button>
                </li>
              ))}
            </ul>
          )}

          <h5 style={{ marginTop: "2rem" }}>오늘 예약 내역</h5>
          {todayReservations.length === 0 ? (
            <p>오늘은 예약 내역이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {todayReservations.map((item, i) => (
                <li key={i} css={s.reservationItem}>
                  {new Date(item.classTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Daymanagement;