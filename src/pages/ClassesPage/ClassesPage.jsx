/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";  // axios 임포트 추가 
import Calendar from "../../components/common/Calendar/Calendar";
import TimeModalForRegistration from "../../components/common/Modal/TimeModalForRegistration/TimeModalForRegistration";
import * as s from "./style";

function ClassPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [alreadyRegisteredTimes, setAlreadyRegisteredTimes] = useState([]);
  const [classSubjectId, setClassSubjectId] = useState(null);
  const [classSubjectName, setClassSubjectName] = useState("");
  const [maxCustomer, setMaxCustomer] = useState(1);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [todayClasses, setTodayClasses] = useState([]);

  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios.get("/api/makefitness/subject/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setClassSubjectId(res.data.classSubjectId);
      setClassSubjectName(res.data.classSubjectName);

      if (res.data.classSubjectName === "PT") setMaxCustomer(1);
      else if (res.data.classSubjectName === "필라테스") setMaxCustomer(6);
    }).catch((err) => {
      console.error("수업 주제 로드 실패", err);
      alert("수업 등록 권한이 없습니다.");
    });
  }, []);

  useEffect(() => {
    const fetchTodayClasses = async () => {
      const token = localStorage.getItem("accessToken");
      const today = new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const todayStr = `${yyyy}-${MM}-${dd}`;

      try {
        const res = await axios.get("/api/makefitness/classes/with-reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter(c => c.classTime.startsWith(todayStr));
        setTodayClasses(filtered);
      } catch (err) {
        console.error("오늘 수업 조회 실패", err);
      }
    };

    fetchTodayClasses();
  }, []);

  const openModalAndFetchRegisteredTimes = async (date) => {
    setSelectedDate(date);
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    try {
      const res = await axios.get(`/api/makefitness/classes/registered-times?date=${dateStr}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlreadyRegisteredTimes(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("등록된 시간 조회 실패", err);
      alert("시간 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleCreateClass = async (times) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      for (const hour of times) {
        const date = new Date(selectedDate);
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const HH = String(hour).padStart(2, "0");
        const classTime = `${yyyy}-${MM}-${dd}T${HH}:00:00`;

        await axios.post("/api/makefitness/classes", {
          classSubjectId,
          classTime,
          classMaxCustomer: parseInt(maxCustomer),
          classCustomerReserve: 0,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      alert("수업이 등록되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error("수업 등록 실패", err);
      alert("수업 등록 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteClass = async (times) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const yyyy = selectedDate.getFullYear();
    const MM = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");

    try {
      const res = await axios.get("/api/makefitness/classes/with-reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      for (const hour of times) {
        const HH = String(hour).padStart(2, "0");
        const matched = res.data.find(c =>
          c.classTime.startsWith(`${yyyy}-${MM}-${dd}`) && c.classTime.includes(`${HH}:00:00`)
        );
        if (matched) {
          await axios.delete(`/api/makefitness/classes/${matched.classId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }
      alert("선택한 수업이 삭제되었습니다.");
      window.location.reload();
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
        <div css={s.box}>
          <Calendar
            scheduleColor="#87CEEB"
            isEditable={false}
            scheduleData={{}}
            setScheduleData={() => {}}
            disablePastDates={true}
            onDateClick={openModalAndFetchRegisteredTimes}
          />
        </div>

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

          {/* 오늘 등록된 수업과 예약자 표시 */}
          <div css={s.todayClassList}>
            <p>오늘 등록된 수업과 예약자:</p>
            {todayClasses.length > 0 ? (
              todayClasses.map((c) => (
                <div key={c.classId} css={s.classEntry}>
                  <span css={s.classTime}>{c.classTime.slice(0, 16).replace("T", " ")}</span>
                  <span css={s.memberNames}>{c.reservedMembers?.join(" ") || "예약자 없음"}</span>
                </div>
              ))
            ) : (
              <p css={s.noClassesMessage}>오늘 등록된 수업이 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TimeModalForRegistration
          selectedDateStr={selectedDateStr}
          alreadyRegisteredTimes={alreadyRegisteredTimes}
          isForRegistration={!isDeleteMode}
          isDeleteMode={isDeleteMode}
          onConfirmReserve={async (times) => {
            setIsModalOpen(false);
            setSelectedTimes(times);
            await handleCreateClass(times);
          }}
          onDeleteClasses={handleDeleteClass}
          onClose={() => setIsModalOpen(false)}
          toggleDeleteMode={() => setIsDeleteMode(prev => !prev)}
        />
      )}
    </div>
  );
}

export default ClassPage;
