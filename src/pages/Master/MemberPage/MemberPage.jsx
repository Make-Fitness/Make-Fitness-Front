    /** @jsxImportSource @emotion/react */
    import * as s from "./style";
    import { useState } from "react";

    const MemberPage = () => {
    const [searchKeyword, setSearchKeyword] = useState("");

    const dummyMembers = [
        {
        id: 1503,
        name: "이나연",
        gender: "여",
        phone: "010-8863",
        status: "활성",
        type: ["PT", "일반회원"],
        expire: "2024-12-31",
        payment: "PT 30회"
        },
        {
        id: 1502,
        name: "최형일",
        gender: "남",
        phone: "010-4578",
        status: "휴회회",
        type: ["필라테스"],
        expire: "2024-11-30",
        payment: "필라테스 30회"
        },
        {
        id: 1501,
        name: "박상군",
        gender: "남",
        phone: "010-2253",
        status: "활성",
        type: ["일반회원"],
        expire: "2024-10-15",
        payment: "일반회원 30일권"
        }
        // ... 생략 가능
    ];

    const filteredMembers = dummyMembers.filter((member) =>
        member.name.includes(searchKeyword)
    );

    return (
        <div css={s.memberPage}>
            <h2>회원 목록</h2>

            <div css={s.searchBar}>
                <input
                type="text"
                placeholder="이름으로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button css={s.button}>검색</button>
            </div>

    

            <table css={s.memberTable}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>회원권 상태</th>
                    <th>멤버십 종류</th>
                    <th>성별</th>
                    <th>전화번호</th>
                    <th>회원권 만료일</th>
                    <th>결제내역</th>
                </tr>
                </thead>
                <tbody>
                {filteredMembers.map((member) => (
                    <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.status}</td>
                    <td>{member.type.join(", ")}</td>
                    <td>{member.gender}</td>
                    <td>{member.phone}</td>
                    <td>{member.expire}</td>
                    <td>{member.payment}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
    };

    export default MemberPage;
