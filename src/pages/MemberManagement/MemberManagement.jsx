/**@jsxImportSource @emotion/react */
import api from '../../configs/axiosConfig';
import * as s from './style';
import React, { useState, useEffect } from "react";

function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [searchnickname, setSearchnickname] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  // 백엔드 API 호출: 검색어가 있을 경우에만 파라미터로 전달합니다.
  const fetchMembers = (nickname = "") => {
    const config = {};
    if (nickname !== "") {
      config.params = { nickname };
    }
    api.get("api/makefitness/manager/membermanagement", config)
      .then((response) => {
        setMembers(response.data);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  // 컴포넌트 마운트 시 전체 회원 데이터를 가져옵니다.
  useEffect(() => {
    fetchMembers();
  }, []);

  // 검색 시 API 호출
  const handleSearch = () => {
    fetchMembers(searchnickname);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 페이징 처리 (클라이언트 측 페이징 예시)
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
          key={i}
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
            currentMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.nickname}</td>
                <td>{member.ph}</td>
                <td>{member.membership}</td>
                <td>{member.promotion_session_count}</td>
                <td>{member.promotion_session_time}</td>
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
