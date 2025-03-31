import { css } from "@emotion/react";

// 회원관리 페이지 전체
export const memberPage = css`
  padding: 3rem;
  background-color: #111;
  color: #fff;
  font-size: 1.625rem;
`;

// 상단 제목과 버튼이 같이 있는 헤더 영역
export const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

// 상단 우측 수정하기 버튼
export const editButton = css`
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #ff4444;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dd2222;
  }
`;

export const description = css`
  margin-bottom: 2rem;
  font-size: 1.375rem;
  font-weight: bold;
`;

export const memberTableWrapper = css`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh;
  margin-top: 2rem;
`;

export const memberTable = css`
  width: 100%;
  min-width: 104rem;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 1.5625rem;

  th,
  td {
    border: 1px solid #444;
    padding: 1.375rem;
    text-align: center;
  }

  thead th {
    background-color: #3a3a3a;
    font-size: 1.625rem;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr:nth-of-type(even) {
    background-color: #2a2a2a;
  }
`;

export const searchBar = css`
  display: flex;
  padding-right: 0.5rem;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    padding: 0.5rem;
    background-color: rgb(96, 96, 96);
    border: none;
    color: #fff;
  }
`;

export const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  color: black;
  background-color: rgb(96, 96, 96);
  border: none;
  cursor: pointer;
`;
