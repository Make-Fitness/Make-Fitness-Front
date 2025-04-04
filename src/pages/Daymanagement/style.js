import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 80vh;
  background-color: black;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const description = css`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
`;

export const box = css`
  display: flex;
  justify-content: center;
  width: 450px;
  height: 530px;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  width: 400px;
  height: 510px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  h5 {
    font-size: 2rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.4rem;
    margin-left: 1rem;
    color: #aaa;
  }
`;

export const reservationList = css`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

export const reservationItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2c;
  border-left: 5px solid #e74c3c;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: white;
`;

export const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

// 공통 버튼 스타일 (예약하기 버튼과 취소 버튼 통일)
export const buttonCommon = css`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  height: 3rem;
  width: 9rem;  // 너비를 동일하게 설정
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

// 비활성화된 버튼 스타일 (정원 마감)
export const disabledButton = css`
  ${buttonCommon}
  background-color: transparent;
  color: #aaa;
  border: 2px solid #aaa;
  cursor: not-allowed;
`;

// 활성화된 예약 버튼 스타일
export const confirmButton = css`
  ${buttonCommon}
  background-color: #e74c3c;
`;

// 취소 버튼 스타일 (예약하기 버튼과 동일)
export const cancelButton = css`
  ${buttonCommon}
  background-color: #880000;  // 기존의 취소 색상
  width: 9rem;                // 예약하기 버튼과 동일한 너비로 수정
`;
