/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";

function MembershipM() {
  
  const [members, setMembers] = useState([]);
 
  const [searchph, setSearchph] = useState("");
 
  const [filteredMembers, setFilteredMembers] = useState([]);

  
  useEffect(() => {
    
    fetch("/api/user_tb")
      .then((response) => response.jWT())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => console.error("데이터를 가져오는 중 오류 발생:", error));
  }, []);

  
  const handleSearch = () => {
    
    if (!searchph) {
      setFilteredMembers(members);
      return;
    }
    
    const result = members.filter((member) =>
      member.ph.includes(searchph)
    );
    setFilteredMembers(result);
  };

  
  useEffect(() => {
    setFilteredMembers(members);
  }, [members]);

  return (
    <div css={s.containerStyle}>
      <h1 css={s.titleStyle}>회원 관리 표</h1>

      <div css={s.searchWrapperStyle}>
        <label htmlFor="phoneInput">전화번호 입력:</label>
        <input
          id="phoneInput"
          type="text"
          placeholder="예) 01012345678"
          value={searchph}
          onChange={(e) => setSearchph(e.target.value)}
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
            <th>생년월일</th>
            <th>전화번호</th>
            <th>프로그램종류</th>
            <th>남은세션</th>
            <th>회원권종료기간</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length === 0 ? (
            <tr>
              <td colSpan={6} css={s.noDataStyle}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.ph}</td>
                <td>{member.membership}</td>
                <td>{member.remainingSessions}</td>
                <td>{member.membershipEndDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MembershipM;
