import { css, keyframes } from "@emotion/react";

// 전체 컨테이너 및 기본 스타일
export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const description = css`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const buttonWrapper = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
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

export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;

export const leftPane = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid #666;
`;

export const subtitle = css`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const instructorPhotoContainer = css`
  width: 250px;
  height: 250px;
  border: 1px solid #666;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const instructorPhotoPlaceholder = css`
  font-size: 1.2rem;
  color: #999;
`;

export const instructorPhotoPreview = css`
  max-width: 100%;
  max-height: 100%;
`;

export const box = css`
  display: flex;
  justify-content: center;
  width: 40rem;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #666;
  color: #fff;
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;

export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const reservationItem = css`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 캘린더 관련 스타일
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

// 체크표시 스타일 (캘린더 셀 오른쪽 상단)
export const checkMark = css`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 1.2rem;
  color: green;
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

  h2 {
    font-size: 2rem;
    color: black;
  }
`;

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
