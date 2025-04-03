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
  height: 510px;
`;

export const reservationListWrapper = css`
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  width: 400px;
  min-height: 450px;
  height: 49rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* Internet Explorer */
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  h5 {
    font-size: 2rem;
    margin-left: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

export const todayClassList = css`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* Internet Explorer */
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const classEntry = css`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  padding: 0.8rem 1rem;
  background-color: #2c2c2c;
  border-radius: 8px;
  color: white;
  border-left: 5px solid #e74c3c;
`;

export const classTime = css`
  font-weight: bold;
  color: #ff7f7f;
  margin-right: 0.8rem;
`;

export const memberNames = css`
  color: #eee;
`;

export const noClassesMessage = css`
  font-size: 1.5rem;
  text-align: center;
  color: #999;
`;
