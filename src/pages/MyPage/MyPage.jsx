/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function MyPage() {
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    ph: "",
    password: "",
    confirmPassword: "",
    classstatus: "",
  });

  const [membershipInfo, setMembershipInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || "";
    const ph = localStorage.getItem("ph") || "";
    const roleName = localStorage.getItem("roleName") || "";

    setForm((prev) => ({
      ...prev,
      name: nickname,
      ph: ph,
      classstatus: roleName,
    }));

    useEffect(() => {
      if (isAttendanceExpanded) {
        document.body.style.overflow = "hidden"; // 스크롤 방지
      } else {
        document.body.style.overflow = "auto"; // 원래대로 복구
      }
    }, [isAttendanceExpanded]);

    // 회원권 정보 불러오기
    axios
      .get(`/api/makefitness/membership?ph=${ph}`)
      .then((res) => {
        setMembershipInfo(res.data); // 예: { promotionName: "30회 PT" }
      })
      .catch((err) => {
        console.error("회원권 정보 불러오기 실패", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (type) => {
    alert(`${type}이(가) 변경되었습니다.`);
  };

  const handleUpdate2 = (type) => {
    alert(`${type} 페이지로 이동합니다.`);
    if (type === "멤버십" || type === "회원권") {
      navigate("/makefitness/membership");
    }
  };

  const classstatusValue = form.classstatus.trim();
  const scheduleColor =
    classstatusValue === "PT"
      ? "#87CEEB"
      : classstatusValue === "PILATES"
      ? "#FFC0CB"
      : "#87CEEB";

  const shouldDisplayMembership = () => {
    const classstatus = form.classstatus.trim();
    return classstatus !== "ROLE_MANAGER" && classstatus !== "ROLE_MASTER";
  };

  return (
    <div css={s.topcon}>
      {
        isAttendanceExpanded &&
        <div css={s.expandedContainer}>
          <h2>내정보</h2>

          <label>이름</label>
          <input
            css={s.input}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            readOnly
          />

          <label>전화번호</label>
          <div css={s.numbercontainer}>
            <input
              css={s.input}
              type="text"
              name="ph"
              value={form.ph}
              onChange={handleChange}
            />
            <button css={s.button2} onClick={() => setIsAttendanceExpanded(false)}>
              변경
            </button>
          </div>

          <label>비밀번호</label>
          <input
            css={s.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label>비밀번호 확인</label>
          <div css={s.passwordcon}>
            <input
              css={s.input}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>
              변경
            </button>
          </div>

        {shouldDisplayMembership() && (
          <>
            <label>이용중인 회원권</label>
            {membershipInfo === null ? (
              <p>회원권 정보를 불러오는 중...</p>
            ) : (
              <input
                css={s.input2}
                type="text"
                name="promotionName"
                value={membershipInfo.promotionName}
                readOnly
              />
            )}
          </>
        )}
      </div>
      }
      {!isAttendanceExpanded &&
      <div css={s.maincontainer}>
        <h2>출석체크</h2>

        <label>아이디</label>
        <input
          css={s.input}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>전화번호</label>
        <div css={s.numbercontainer}>
          <input
            css={s.input}
            type="text"
            name="ph"
            value={form.ph}
            onChange={handleChange}
          />
          <button css={s.togglebtn} onClick={() => setIsAttendanceExpanded(true)}>
            변경
          </button>
        </div>
      </div>
      }
    </div>
  );
}

export default MyPage;
