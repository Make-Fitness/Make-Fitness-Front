/** @jsxImportSource @emotion/react */
import api from '../../configs/axiosConfig';
import * as s from './style';
import React, { useState, useEffect } from "react";

function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [searchnickname, setSearchnickname] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  const fetchMembers = (nickname = "") => {
    console.log("🔁 [fetchMembers] 호출됨, nickname:", nickname);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("⛔ accessToken 없음, 요청 중단");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {},
    };

    if (nickname !== "") {
      config.params.nickName = nickname;
    }

    api.get("/api/makefitness/manager/membermanagement", config)
      .then((response) => {
        console.log("✅ [fetchMembers] 응답 성공:", response.data);
        setMembers(response.data);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("❌ [fetchMembers] 요청 실패:", error);
      });
  };

  useEffect(() => {
    console.log("🧠 [useEffect] 컴포넌트 마운트됨, fetchMembers 실행");
    fetchMembers();
  }, []);

  const handleSearch = () => {
    console.log("🔍 [handleSearch] 검색 실행:", searchnickname);
    fetchMembers(searchnickname);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(members.length / membersPerPage);

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        css={s.pageButtonStyle(false)}
      >
        ◀
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={`page-${i}`}
          onClick={() => setCurrentPage(i)}
          css={s.pageButtonStyle(i === currentPage)}
        >
          {i}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        css={s.pageButtonStyle(false)}
      >
        ▶
      </button>
    );

    return pages;
  };

  return (
    <div css={s.containerStyle}>
      <h1 css={s.titleStyle}>회원 관리표</h1>

      <div css={s.searchWrapperStyle}>
        <label htmlFor="nicknameInput" css={s.labelStyle}>
          이름 입력:
        </label>
        <input
          id="nicknameInput"
          type="text"
          placeholder="예) 고길동"
          value={searchnickname}
          onChange={(e) => setSearchnickname(e.target.value)}
          onKeyDown={handleKeyPress}
          css={s.inputStyle}
        />
        <button onClick={handleSearch} css={s.buttonStyle}>
          조회
        </button>
      </div>

      <table css={s.tableStyle}>
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>프로모션</th>
            <th>남은횟수</th>
            <th>종료기간</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.length === 0 ? (
            <tr>
              <td colSpan={5} css={s.noDataStyle}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            currentMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.nickName}</td>
                <td>{member.ph}</td>
                <td>{member.promotionName}</td>
                <td>{member.promotionSessionCount}회</td>
                <td>
                  {member.expiredDate
                    ? new Date(member.expiredDate).toLocaleDateString("ko-KR")
                    : "없음"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div css={s.paginationWrapperStyle}>{renderPageNumbers()}</div>
      )}
    </div>
  );
}

export default MemberManagement;
