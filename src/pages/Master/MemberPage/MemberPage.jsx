/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { getMembers, updateMemberRole } from "../../../apis/masterApi";

const MemberTable = () => {
  const [rawMembers, setRawMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const membersPerPage = 10;

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setRawMembers(data);
      const grouped = groupMembersByUserId(data);
      setMembers(grouped);
      setCurrentPage(1);
    } catch (err) {
      console.error("회원 목록 조회 실패:", err);
    }
  };

  const groupMembersByUserId = (data) => {
    return data.reduce((acc, curr) => {
      const existing = acc.find((m) => m.userId === curr.userId);
      const promotion = {
        promotionName: curr.promotionName,
        promotionSessionCount: curr.promotionSessionCount,
        expiredDate: curr.expiredDate,
      };

      if (existing) {
        existing.promotionList.push(promotion);
      } else {
        acc.push({
          userId: curr.userId,
          nickName: curr.nickName,
          ph: curr.ph,
          gender: curr.gender,
          createdAt: curr.createdAt,
          roleName: curr.roleName,
          promotionList: [promotion],
        });
      }

      return acc;
    }, []);
  };

  const handleRoleSelect = (userId, newRole) => {
    setEditedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSave = async (userId) => {
    const newRole = editedRoles[userId];
    if (!newRole) return;

    try {
      await updateMemberRole({ userId, roleName: newRole });

      setMembers((prev) =>
        prev.map((m) => (m.userId === userId ? { ...m, roleName: newRole } : m))
      );

      setEditedRoles((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });

      setSuccessMessage(`회원번호 ${userId} 저장되었습니다.`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(`${userId} 저장 실패:`, err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const roleOptions = [
    { value: "ROLE_MANAGER", label: "강사" },
    { value: "ROLE_CUSTOMER", label: "회원" },
    { value: "ROLE_ANONYMOUS", label: "익명" },
  ];

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
    <div css={s.memberPage}>
      <div css={s.headerArea}>
        <h2>회원 관리</h2>
      </div>

      {successMessage && <div css={s.alertBox}>{successMessage}</div>}

      <div css={s.memberTableWrapper}>
        <table css={s.memberTable}>
          <thead>
            <tr>
              <th>회원번호</th>
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
            {currentMembers.length > 0 ? (
              currentMembers.map((m, index) => (
                <tr key={`${m.userId || "no-id"}-${index}`}>
                  <td>{m.userId}</td>
                  <td>{formatDate(m.createdAt)}</td>
                  <td>
                    <select
                      value={editedRoles[m.userId] ?? m.roleName}
                      onChange={(e) => handleRoleSelect(m.userId, e.target.value)}
                      css={s.selectBox}
                    >
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{m.nickName}</td>
                  <td>{m.ph}</td>
                  <td>{m.gender || "-"}</td>
                  <td>
                    {Array.isArray(m.promotionList) && m.promotionList.length > 0 ? (
                      <select css={s.selectBox} disabled>
                        {m.promotionList.map((p, idx) => (
                          <option key={idx}>
                            {p.promotionName} ({p.promotionSessionCount}회) - {formatDate(p.expiredDate)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "없음"
                    )}
                  </td>
                  <td>
                    {m.promotionList && m.promotionList.length > 0
                      ? formatDate(m.promotionList[m.promotionList.length - 1].expiredDate)
                      : "-"}
                  </td>
                  <td>
                    <button onClick={() => handleSave(m.userId)} css={s.button}>
                      저장
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", color: "#aaa" }}>
                  조회된 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div css={s.paginationWrapperStyle}>{renderPageNumbers()}</div>
        )}
      </div>
    </div>
  );
};

export default MemberTable;
