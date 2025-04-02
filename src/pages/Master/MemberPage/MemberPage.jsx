/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style"; // 스타일 정의

const MemberTable = () => {
  const [members, setMembers] = useState([]);

  // ✅ 회원 데이터 호출
  useEffect(() => {
    fetch("/api/makefitness/admin/users")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("회원 목록 조회 실패:", err));
  }, []);

  // ✅ 전체 수정 버튼 클릭
  const handleEditAll = () => {
    console.log("상단 수정하기 버튼 클릭");
  };

  // ✅ 회원 구분 변경 버튼 클릭
  const handleChangeRole = (userId) => {
    console.log("회원구분 변경 클릭:", userId);
  };

  // ✅ 개별 수정 버튼 클릭
  const handleEdit = (userId) => {
    console.log("회원 개별 수정 클릭:", userId);
  };

  // ✅ 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // ✅ 회원구분 포맷
  const formatRole = (roleName) => {
    return roleName === "manager" ? "강사" : "회원";
  };

  return (
    <div css={s.memberPage}>
      <div css={s.headerArea}>
        <h2>회원 관리</h2>
        <button css={s.editButton} onClick={handleEditAll}>
          수정하기
        </button>
      </div>

      <table css={s.memberTable}>
        <thead>
          <tr>
            <th>가입날짜</th>
            <th>회원구분</th>
            <th>이름</th>
            <th>휴대폰번호</th>
            <th>성별</th>
            <th>프로모션</th>
            <th>종료기간</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((m) => (
              <tr key={m.userId}>
                <td>{formatDate(m.createdAt)}</td>
                <td>
                  {formatRole(m.roleName)}{" "}
                  <button onClick={() => handleChangeRole(m.userId)}>▼</button>
                </td>
                <td>{m.nickName}</td>
                <td>{m.ph}</td>
                <td>{m.gender || "-"}</td>
                <td>{m.promotionName || "없음"}</td>
                <td>{formatDate(m.expiredDate)}</td>
                <td>
                  <button onClick={() => handleEdit(m.userId)} css={s.button}>
                    수정
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#aaa" }}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <footer css={s.footer}>© MAKE FITNESS. All rights reserved.</footer>
    </div>
  );
};

export default MemberTable;
