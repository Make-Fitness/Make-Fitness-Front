/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import ClassReservationModal from "../../components/common/Modal/ClassReservationModal/ClassReservationModal";
import { useLocation } from "react-router-dom";
import {
  getReservableClasses,
  getTodayReservations,
  reserveClass,
  cancelReservation,
  getReservationHistory,
} from "../../apis/reservationApi";

function Daymanagement() {
  const location = useLocation();

  const [selectedClass] = useState("pt");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const [reservableClasses, setReservableClasses] = useState([]);
  const [selectedDateReservations, setSelectedDateReservations] = useState([]);
  const [todayReservations, setTodayReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const selectedDateStr = formatDate(currentDate);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  const loadReservableClasses = async () => {
    if (!selectedMembershipId) return;
    try {
      const { data = [] } = await getReservableClasses(selectedMembershipId);
      setReservableClasses(data);

      const grouped = data.reduce((acc, cls) => {
        const date = cls.classTime.split("T")[0];
        acc[date] = [...(acc[date] || []), {
          time: cls.classTime,
          trainer: cls.trainerName,
          subject: cls.classSubject,
          classId: cls.classId,
        }];
        return acc;
      }, {});
      setScheduleData((prev) => {
        const merged = { ...prev };
        for (const date in grouped) {
          merged[date] = [...(merged[date] || []), ...grouped[date]];
        }
        return merged;
      });
    } catch (err) {
      console.error("예약 가능 수업 로드 실패", err);
    }
  };

  const loadReservationHistory = async () => {
    if (!selectedMembershipId) return;
    try {
      const { data = [] } = await getReservationHistory(selectedMembershipId);
      setPastReservations(data);

      const grouped = data
        .filter(cls => cls && cls.classTime) // null 체크
        .reduce((acc, cls) => {
          const date = cls.classTime.split("T")[0];
          acc[date] = [...(acc[date] || []), {
            time: cls.classTime,
            trainer: cls.trainerName,
            subject: cls.classSubject,
            classId: cls.classId,
          }];
          return acc;
        }, {});

      setScheduleData((prev) => {
        const merged = { ...prev };
        for (const date in grouped) {
          merged[date] = [...(merged[date] || []), ...grouped[date]];
        }
        return merged;
      });
    } catch (err) {
      console.error("과거 수업 이력 로드 실패", err);
    }
  };

  const loadTodayReservations = async () => {
    if (!selectedMembershipId) return;
    try {
      const { data = [] } = await getTodayReservations(selectedMembershipId);
      setTodayReservations(data);
    } catch (err) {
      console.error("오늘 예약 로드 실패", err);
    }
  };

  const handleReserve = async (classId) => {
    if (!selectedMembershipId) return;
    try {
      await reserveClass(classId, selectedMembershipId);
      alert("예약 성공!");
      await loadReservableClasses();
      await loadTodayReservations();
    } catch (err) {
      alert("예약 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = async (reservationId) => {
    if (!window.confirm("정말 이 예약을 취소하시겠습니까?")) return;
    try {
      await cancelReservation(reservationId);
      alert("예약이 취소되었습니다.");
      await loadReservableClasses();
      await loadTodayReservations();
    } catch (err) {
      alert("예약 취소 실패: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    const filtered = reservableClasses.filter(cls =>
      cls.classTime.startsWith(selectedDateStr)
    );
    setSelectedDateReservations(filtered);
  }, [reservableClasses, selectedDateStr]);

  useEffect(() => {
    const id = location.state?.selectedMembershipId;
    if (id) setSelectedMembershipId(id);
  }, [location]);

  useEffect(() => {
    if (!selectedMembershipId) return;
    loadReservableClasses();
    loadTodayReservations();
    loadReservationHistory();
  }, [selectedMembershipId]);

  const availableClassMap = selectedDateReservations.reduce((acc, cls) => {
    const hour = new Date(cls.classTime).getHours();
    acc[hour] = cls.classId;
    return acc;
  }, {});

  const today = new Date();
  const isPastDate = new Date(selectedDateStr) < new Date(today.toISOString().split("T")[0]);

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
            disablePastDates={false}
            onDateClick={(date) => {
              setSelectedTime(null);
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
              {selectedDateReservations
                .sort((a, b) => new Date(a.classTime) - new Date(b.classTime))
                .map((cls, i) => {
                  const current = cls.currentCustomer || 0;
                  const max = cls.maxCustomer || 0;
                  const remaining = max - current;
                  const isFull = remaining <= 0;

                  return (
                    <li key={i} css={s.reservationItem}>
                      {new Date(cls.classTime).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} {" "}
                      ({isFull ? "정원 마감" : `${remaining}명 남음`})
                      {!isPastDate && (
                        <button
                          onClick={() => handleReserve(cls.classId)}
                          css={isFull ? s.disabledButton : s.buttonCommon}
                          disabled={isFull}
                        >
                          {isFull ? "정원 마감" : "예약하기"}
                        </button>
                      )}
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
              {todayReservations.map((res, i) => (
                <li key={i} css={s.reservationItem}>
                  {new Date(res.classTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <button
                    onClick={() => handleCancel(res.reservationId)}
                    css={s.cancelButton}
                  >
                    취소
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && !isPastDate && (
        <ClassReservationModal
          selectedDateLabel={selectedDateStr}
          reservableClassMap={availableClassMap}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onConfirmReserve={() => {
            handleReserve(availableClassMap[selectedTime]);
            setIsModalOpen(false);
            setSelectedTime(null);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTime(null);
          }}
        />
      )}
    </div>
  );
}

export default Daymanagement;
