import { css, keyframes } from "@emotion/react";


export const calendarAndListWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem; 
  width: 25rem;
`;

export const leftWrapper = css`
  flex: 1;
`;

export const box = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  
`;

export const button = css`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spinnerStyle = css`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #444;
  border-radius: 50%;
  width: 24pxx;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin: 1rem auto;
`;

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
  background-color: #fff;
  min-height: 50px;
  padding: 0.5rem;
  text-align: right;
  cursor: pointer;
  position: relative;
  border: 1px solid #ccc;
`;

export const emptyCell = css`
  background-color: #fff;
  min-height: 50px;
  border: 1px solid #ccc;
`;

// 모달 스타일
export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContent = css`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  color: black !important;

  p {
    font-size: 1.8rem;
    color: black;
  }

  h3 {
    font-size: 2rem;
    color: black;
  }
`;

// 예약 추가 시 시간 슬롯 컨테이너
export const timeSlotContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const buttonbox = css`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const titleBlack = css`
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
`;