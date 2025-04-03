/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";

const MemberTable = () => {
  const [rawMembers, setRawMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("/api/makefitness/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setRawMembers(data);
        const grouped = groupMembersByUserId(data);
        setMembers(grouped);
      })
      .catch((err) => console.error("회원 목록 조회 실패:", err));
  }, []);

  const groupMembersByUserId = (data) => {
    return data.reduce((acc, curr) => {
      const existing = acc.find((m) => m.userId === curr.userId);
      const promotion = {
        promotionName: curr.promotionName,
        expiredDate: curr.expiredDate,
      };

      if (existing) {
        existing.promotionList.push(promotion);
      } else {
        acc.push({
          ...curr,
          promotionList: [promotion],
        });
      }

      return acc;
    }, []);
  };

  const handleRoleSelect = (userId, newRole) => {
    setEditedRoles((prev) => ({ ...prev, [String(userId)]: newRole }));
  };

  const handleSave = (userId) => {
    const newRole = editedRoles[String(userId)];
    if (!newRole) return;

    fetch(`/api/makefitness/admin/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userId, roleName: newRole }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("권한 변경 실패");

        setMembers((prev) =>
          prev.map((m) =>
            m.userId === userId ? { ...m, roleName: newRole } : m
          )
        );

        setEditedRoles((prev) => {
          const updated = { ...prev };
          delete updated[String(userId)];
          return updated;
        });

        setSuccessMessage(`회원번호 ${userId} 저장되었습니다.`);
        setTimeout(() => setSuccessMessage(""), 3000);
        console.log(`${userId} 저장 완료`);
      })
      .catch((err) => console.error(`${userId} 저장 실패:`, err));
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

  return (
    <div css={s.memberPage}>
      <div css={s.headerArea}>
        <h2>회원 관리</h2>
      </div>

      {successMessage && <div css={s.successMessage}>{successMessage}</div>}

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
            {members.length > 0 ? (
              members.map((m, index) => (
                <tr key={`${m.userId || "no-id"}-${index}`}>
                  <td>{m.userId}</td>
                  <td>{formatDate(m.createdAt)}</td>
                  <td>
                    <select
                      key={`role-${m.userId}-${editedRoles[m.userId] ?? m.roleName}`}
                      value={
                        typeof editedRoles[m.userId] !== "undefined"
                          ? editedRoles[m.userId]
                          : m.roleName
                      }
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
                    {m.promotionList && m.promotionList.length > 0 ? (
                      <select
                        css={s.selectBox}
                        value={m.promotionList[0]?.promotionName}
                        onChange={() => {}}
                      >
                        {m.promotionList.map((p, idx) => (
                          <option key={idx}>{p.promotionName}</option>
                        ))}
                      </select>
                    ) : (
                      "없음"
                    )}
                  </td>
                  <td>
                    {m.promotionList && m.promotionList.length > 0
                      ? formatDate(
                          m.promotionList[m.promotionList.length - 1].expiredDate
                        )
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
      </div>

      <footer css={s.footer}>© MAKE FITNESS. All rights reserved.</footer>
    </div>
  );
};

export default MemberTable;