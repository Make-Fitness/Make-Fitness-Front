/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import axios from "axios";

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMembers = async (nickName = "") => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get("/api/makefitness/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: nickName ? { nickName } : {},
      });

      setMembers(response.data);
    } catch (error) {
      console.log("❌ 회원 목록 조회 실패:", error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = () => {
    fetchMembers(searchTerm.trim());
  };

  const handleEdit = (userId) => {
    console.log("회원 개별 수정 클릭:", userId);
  };

  const formatRole = (roleName) => {
    return roleName === "ROLE_MANAGER" ? "강사" : "회원";
  };

  const formatDate = (dateString) => {
    return dateString ? dateString.slice(0, 10) : "-";
  };

  return (
    <div css={s.memberPage}>
      <div css={s.headerArea}>
        <h2>회원 관리</h2>

        <div css={s.searchBox}>
          <input
            type="text"
            placeholder="닉네임 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            css={s.searchInput}
          />
          <button onClick={handleSearch} css={s.searchButton}>
            검색
          </button>
        </div>

        <button css={s.editButton}>수정하기</button>
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
            members.map((m, index) => (
              <tr key={m.userId ?? `${m.nickName}-${index}`}>
                <td>{formatDate(m.createdAt)}</td>
                <td>{formatRole(m.roleName)}</td>
                <td>{m.nickName}</td>
                <td>{m.ph}</td>
                <td>{m.gender || "-"}</td>
                <td>{m.promotionName || "없음"}</td>
                <td>{formatDate(m.expiredDate)}</td>
                <td>
                  <button css={s.button} onClick={() => handleEdit(m.userId)}>
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

export default MemberPage;
