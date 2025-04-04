/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { useLocation } from "react-router-dom";
import TimeModal from "../../components/common/Modal/TimeModal";

function Daymanagement() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const [reservableClasses, setReservableClasses] = useState([]);
  const [todayReservations, setTodayReservations] = useState([]);
  const [selectedDateReservations, setSelectedDateReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const location = useLocation();

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const state = location.state;
    if (state?.selectedMembershipId) {
      setSelectedMembershipId(state.selectedMembershipId);
    }
  }, [location]);

  const fetchReservableClasses = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedMembershipId) return;

    try {
      const res = await axios.get("/api/makefitness/classes/reservable", {
        headers: { Authorization: `Bearer ${token}` },
        params: { membershipId: selectedMembershipId },
      });

      const result = res.data || [];
      setReservableClasses(result);

      const grouped = {};
      result.forEach((item) => {
        const date = item.classTime.split("T")[0];
        grouped[date] = (grouped[date] || []).concat({
          time: item.classTime,
          trainer: item.trainerName,
          subject: item.classSubject,
          classId: item.classId,
        });
      });

      setScheduleData(grouped);
    } catch (err) {
      console.error("❌ 예약 가능 수업 로드 실패", err);
    }
  };

  const fetchTodayReservations = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedMembershipId) return;

    try {
      const res = await axios.get("/api/makefitness/reservation/today", {
        headers: { Authorization: `Bearer ${token}` },
        params: { membershipId: selectedMembershipId },
      });
      setTodayReservations(res.data || []);
    } catch (err) {
      console.error("❌ 오늘 예약 로딩 실패", err);
    }
  };

  useEffect(() => {
    fetchReservableClasses();
    fetchTodayReservations();
  }, [selectedMembershipId]);

  useEffect(() => {
    const selectedDateStr = formatDate(currentDate);
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
      await fetchReservableClasses();
      await fetchTodayReservations();
    } catch (err) {
      console.error("❌ 예약 실패", err);
      alert("예약 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancelReservation = async (reservationId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const confirmed = window.confirm("정말 이 예약을 취소하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/makefitness/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ 예약이 취소되었습니다.");
      await fetchReservableClasses();
      await fetchTodayReservations();
    } catch (err) {
      console.error("❌ 예약 취소 실패", err);
      alert("예약 취소 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const selectedDateStr = formatDate(currentDate);
  const availableClassMap = {};
  selectedDateReservations.forEach((cls) => {
    const hour = new Date(cls.classTime).getHours();
    availableClassMap[hour] = cls.classId;
  });

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 예약</h1>
      <p css={s.description}>수업 예약 및 캘린더 기반 예약 등록</p>

      <div css={s.contentWrapper}>
        <div css={s.box}>
          <Calendar
            scheduleColor={colorMap[selectedClass]}
            isEditable={false}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            setCurrentDate={setCurrentDate}
            disablePastDates={true}
            onDateClick={(date) => {
              setCurrentDate(date);
              setIsModalOpen(true);
            }}
          />
        </div>

        <div css={s.reservationListWrapper}>
          <h5>{selectedDateStr} 예약 가능한 수업</h5>
          {selectedDateReservations.length === 0 ? (
            <p>예약 가능한 수업이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {[...selectedDateReservations]
                .sort((a, b) => new Date(a.classTime) - new Date(b.classTime))
                .map((item, i) => {
                  const current = item.currentCustomer || 0;
                  const max = item.maxCustomer || 0;
                  const remaining = max - current;
                  const isFull = remaining <= 0;

                  return (
                    <li key={i} css={s.reservationItem}>
                      {new Date(item.classTime).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      ({isFull ? "정원 마감" : `${remaining}명 남음`})
                      <button
                        onClick={() => handleReserveClass(item.classId)}
                        css={isFull ? s.disabledButton : s.buttonCommon}  // 동일한 스타일 적용
                        disabled={isFull}
                      >
                        {isFull ? "정원 마감" : "예약하기"}
                      </button>
                    </li>
                  );
                })}
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
                  <button
                    onClick={() => handleCancelReservation(item.reservationId)}
                    css={s.cancelButton} // 동일한 스타일 적용
                  >
                    취소
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TimeModal
          selectedDateStr={selectedDateStr}
          availableClassMap={availableClassMap}
          selectedTime={selectedTime}
          onSelectTime={(hour) => setSelectedTime(hour)}
          onConfirmReserve={() =>
            handleReserveClass(availableClassMap[selectedTime])
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Daymanagement;
