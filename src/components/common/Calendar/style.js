import { css } from "@emotion/react";

export const calendarWrapper = css`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  width: 40rem;
`;

export const calendarHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const calendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ccc;
`;

export const calendarDayHeader = css`
  background-color: #eee;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
`;

export const calendarDateCell = css`
  min-height: 50px;
  padding: 0.5rem;
  text-align: right;
  cursor: pointer;
  position: relative;
  border: 1px solid #ccc;
  background-color: transparent;
  transition: background-color 0.3s ease;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

export const emptyCell = css`
  background-color: #fff;
  min-height: 50px;
  border: 1px solid #ccc;
`;

// ✅ 중앙에 큰 체크 아이콘
export const checkMarkBig = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: bold;
  color: red;
  pointer-events: none;
`;

export const pastDateCell = css`
  background-color: #f8d7da;
  color: #999;
  pointer-events: none;
  opacity: 0.6;
`;

export const button = css`
  padding: 0.5rem 1rem;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const titleBlack = css`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
`;

export const checkMark = css`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 1rem;
  color: green;
  font-weight: bold;
`;
