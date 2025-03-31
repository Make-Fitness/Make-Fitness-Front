/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style"; // 스타일 정의

const MemberTable = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/members") // 실제 API로 대체
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditAll = () => {
    console.log("상단 수정하기 버튼 클릭");
    // 전체 수정 로직 or 모달 띄우기
  };

  const handleChangeRole = (userId) => {
    console.log("회원구분 변경 클릭:", userId);
  };

  const handleEdit = (userId) => {
    console.log("회원 개별 수정 클릭:", userId);
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
            <th>구분</th>
            <th>회원권 만료일</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.user_id}>
              <td>{m.join_date}</td>
              <td>
                {m.role_name}{" "}
                <button onClick={() => handleChangeRole(m.user_id)}>▼</button>
              </td>
              <td>{m.nickname}</td>
              <td>{m.ph}</td>
              <td>{m.gender}</td>
              <td>{m.class_status}</td>
              <td>{m.expire_date}</td>
              <td>
                <button onClick={() => handleEdit(m.user_id)} css={s.button}> 수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
