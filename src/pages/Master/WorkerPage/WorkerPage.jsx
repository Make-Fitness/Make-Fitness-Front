    /** @jsxImportSource @emotion/react */
    import React from "react";
    import * as s from "./style";

    const WorkerPage = () => {
    const dummyStaffs = [
        { id: 1, name: "김태훈", gender: "남", age: "30세", phone: "010-1234-5678", lessonCount: 25, lessonCost: "50,000원" },
        { id: 2, name: "이수민", gender: "여", age: "28세", phone: "010-2345-6789", lessonCount: 30, lessonCost: "45,000원" },
        { id: 3, name: "정우성", gender: "남", age: "35세", phone: "010-3456-7890", lessonCount: 20, lessonCost: "55,000원" },
    ];

    return (
        <div css={s.staffPage}>
        <h2>근무자 목록</h2>

        <table css={s.staffTable}>
            <thead>
            <tr>
                <th>No</th>
                <th>이름</th>
                <th>성별</th>
                <th>연령</th>
                <th>전화번호</th>
                <th>수업건수</th>
                <th>수업 단가</th>
            </tr>
            </thead>
            <tbody>
            {dummyStaffs.map((staff) => (
                <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.gender}</td>
                <td>{staff.age}</td>
                <td>{staff.phone}</td>
                <td>{staff.lessonCount}</td>
                <td>{staff.lessonCost}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default WorkerPage;
