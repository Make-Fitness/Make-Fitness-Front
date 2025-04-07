/** @jsxImportSource @emotion/react */
// Emotion의 css prop 사용 활성화

import React, { useState, useEffect } from "react";
import Calendar from "../../components/common/Calendar/Calendar";
import TimeModalForRegistration from "../../components/common/Modal/TimeModalForRegistration/TimeModalForRegistration";
import * as s from "./style";

// 수업 관련 API
import {
  fetchClassSubject,
  fetchTodayClasses,
  fetchRegisteredTimes,
  createClass,
  deleteClass,
} from "../../apis/classApi";

function ClassesPage() {
  // 선택한 날짜 상태
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 모달 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달에서 선택된 시간들
  const [selectedTimes, setSelectedTimes] = useState([]);

  // 이미 등록된 시간들 (모달에서 비활성화 표시용)
  const [alreadyRegisteredTimes, setAlreadyRegisteredTimes] = useState([]);

  // 수업 주제 및 최대 인원 관련 상태
  const [classSubjectId, setClassSubjectId] = useState(null);
  const [classSubjectName, setClassSubjectName] = useState("");
  const [maxCustomer, setMaxCustomer] = useState(1);

  // 삭제 모드 여부
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // 선택된 날짜의 수업 리스트
  const [todayClasses, setTodayClasses] = useState([]);

  // 캘린더에 표시할 스케줄 데이터
  const [scheduleData, setScheduleData] = useState({});

  // yyyy-MM-dd 형식으로 날짜 포맷
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const selectedDateStr = formatDate(selectedDate);

  // 과거 날짜인지 여부 (등록/삭제 제한에 사용)
  const isPast = new Date(selectedDate.setHours(0, 0, 0, 0)) < new Date(new Date().setHours(0, 0, 0, 0));

  // 수업 주제 정보 불러오기 (PT / 필라테스)
  useEffect(() => {
    const loadSubject = async () => {
      try {
        const { data } = await fetchClassSubject();
        setClassSubjectId(data.classSubjectId);
        setClassSubjectName(data.classSubjectName);

        // 주제에 따라 최대 인원 자동 설정
        if (data.classSubjectName === "PT") setMaxCustomer(1);
        else if (data.classSubjectName === "필라테스") setMaxCustomer(6);
      } catch (err) {
        console.error("수업 주제 로드 실패", err);
        alert("수업 등록 권한이 없습니다.");
      }
    };

    loadSubject();
  }, []);

  // 수업 정보 불러오기 + 스케줄 데이터 구성
  const loadTodayClasses = async () => {
    try {
      const { data } = await fetchTodayClasses();
      const filtered = data.filter((c) =>
        c.classTime.startsWith(formatDate(selectedDate))
      );
      setTodayClasses(filtered);

      const grouped = data.reduce((acc, cls) => {
        const dateKey = cls.classTime.split("T")[0];
        acc[dateKey] = [...(acc[dateKey] || []), {
          time: cls.classTime,
          subject: cls.classSubject || classSubjectName,
          classId: cls.classId,
        }];
        return acc;
      }, {});
      setScheduleData(grouped);
    } catch (err) {
      console.error("수업 조회 실패", err);
    }
  };

  // 선택 날짜 변경 시 수업 정보 갱신
  useEffect(() => {
    loadTodayClasses();
  }, [selectedDate]);

  // 날짜 클릭 시 등록된 시간 + 모달 열기
  const openModalAndFetchRegisteredTimes = async (date) => {
    setSelectedDate(date);
    try {
      const { data } = await fetchRegisteredTimes(formatDate(date));
      setAlreadyRegisteredTimes(data || []);
      setIsModalOpen(true);
    } catch (err) {
      console.error("등록된 시간 조회 실패", err);
      alert("시간 정보를 불러오는 데 실패했습니다.");
    }
  };

  // 수업 등록 로직 (과거면 막기)
  const handleCreateClass = async (times) => {
    if (isPast) {
      alert("과거 날짜에는 수업을 등록할 수 없습니다.");
      return;
    }

    try {
      const dateStr = formatDate(selectedDate);
      const createPromises = times.map((hour) => {
        const classTime = `${dateStr}T${String(hour).padStart(2, "0")}:00:00`;
        return createClass({
          classSubjectId,
          classTime,
          classMaxCustomer: parseInt(maxCustomer),
          classCustomerReserve: 0,
        });
      });

      await Promise.all(createPromises);
      alert("수업이 등록되었습니다.");
      await loadTodayClasses();
    } catch (err) {
      console.error("수업 등록 실패", err);
      alert("수업 등록 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 수업 삭제 로직 (과거면 막기)
  const handleDeleteClass = async (times) => {
    if (isPast) {
      alert("과거 날짜의 수업은 삭제할 수 없습니다.");
      return;
    }

    try {
      const fullDate = formatDate(selectedDate);
      const { data } = await fetchTodayClasses();

      const matchedList = times.map((hour) => {
        const HH = String(hour).padStart(2, "0");
        return data.find((c) =>
          c.classTime.startsWith(fullDate) && c.classTime.includes(`${HH}:00:00`)
        );
      }).filter(Boolean);

      await Promise.all(matchedList.map((c) => deleteClass(c.classId)));
      alert("선택한 수업이 삭제되었습니다.");
      await loadTodayClasses();
    } catch (err) {
      console.error("수업 삭제 실패", err);
      alert("수업 삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 등록</h1>
      <p css={s.description}>트레이너가 수업을 등록하거나 삭제할 수 있는 페이지입니다.</p>

      <div css={s.contentWrapper}>
        {/* 캘린더 */}
        <div css={s.box}>
          <Calendar
            scheduleColor="#87CEEB"
            isEditable={false}
            scheduleData={scheduleData}
            setScheduleData={() => {}}
            disablePastDates={false} // ✅ 과거 날짜도 클릭 가능
            onDateClick={openModalAndFetchRegisteredTimes}
          />
        </div>

        {/* 우측 패널 */}
        <div css={s.reservationListWrapper}>
          <h5>{selectedDateStr} 수업 관리</h5>

          <div style={{ marginBottom: "1rem" }}>
            <label>수업 주제: </label>
            <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              {classSubjectName || "불러오는 중..."}
            </span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>최대 인원: </label>
            <input
              type="number"
              min={1}
              value={maxCustomer}
              onChange={(e) => setMaxCustomer(e.target.value)}
              style={{ fontSize: "1.2rem", width: "60px" }}
            />
          </div>

          {/* 수업 리스트 */}
          <div css={s.todayClassList}>
            <p>선택된 날짜의 수업과 예약자:</p>
            {todayClasses.length > 0 ? (
              todayClasses.map((c) => (
                <div key={c.classId} css={s.classEntry}>
                  <span css={s.classTime}>
                    {c.classTime.slice(0, 16).replace("T", " ")}
                  </span>
                  <span css={s.memberNames}>
                    {c.reservedMembers?.join(" ") || "예약자 없음"}
                  </span>
                </div>
              ))
            ) : (
              <p css={s.noClassesMessage}>등록된 수업이 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      {/* 모달: 수업 시간 선택 */}
      {isModalOpen && (
        <TimeModalForRegistration
          selectedDateStr={selectedDateStr}
          alreadyRegisteredTimes={alreadyRegisteredTimes}
          isForRegistration={!isDeleteMode}
          isDeleteMode={isDeleteMode}
          onConfirmReserve={async (times) => {
            setIsModalOpen(false);
            setSelectedTimes(times);
            await handleCreateClass(times); // 과거면 등록 막힘
          }}
          onDeleteClasses={handleDeleteClass} // 과거면 삭제 막힘
          onClose={() => setIsModalOpen(false)}
          toggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
        />
      )}
    </div>
  );
}

export default ClassesPage;
