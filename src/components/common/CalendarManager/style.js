import { css, keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spinnerStyle = css`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #444;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin: 1rem auto;
`;

export const errorMessage = css`
  color: red;
  margin: 0.5rem 0;
`;

export const calendarAndListWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  padding: 2rem;
  min-height: 100vh;
  gap: 2rem;
`;

export const leftWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const rightWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const teacherInfoWrapper = css`
  background-color: #444;
  color: #fff;
  width: 220px;
  min-height: 200px;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  h3 {
    margin: 0 0 1rem 0;
    color: #fff;
  }
`;

export const teacherImage = css`
  width: 80px;
  height: 80px;
  margin-top: 0.5rem;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #fff;
`;

export const box = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const number = css`
  width: 200px;
  height: 20px;
  margin-right: 10px;
  border-radius: 4px;
  color: black;
  padding: 0.3rem;
`;

export const button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #444;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
  height: 25px;
`;

export const calendarWrapper = css`
  width: 380px;
  margin-top: 1rem;
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
  gap: 1px;
  background-color: #ccc;
`;

export const calendarDayHeader = css`
  background-color: #eee;
  color: #000;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
`;

export const emptyCell = css`
  background-color: #fff;
  min-height: 50px;
`;

export const calendarDateCell = css`
  background-color: #fff;
  min-height: 50px;
  padding: 0.5rem;
  text-align: right;
  position: relative;
  cursor: pointer;
`;
