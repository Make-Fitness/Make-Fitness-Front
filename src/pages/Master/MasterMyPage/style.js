import { css } from "@emotion/react";

export const topcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 5rem;

  input {
    width: 55rem;  /* 인풋 길이를 60%로 설정하여 화면에 맞게 길이를 줄임 */
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #d1d1d1;
    font-size: 1.5rem;
    color: black;
  }
  
  label {
    display: block; /* 라벨을 블록 요소로 설정하여 인풋 위에 배치 */
    font-size: 1.5rem;
    color: #dbdbdb;
    margin-bottom: 0.5rem;
  }
`;

export const maincontainer = css`
  width: 50rem;
  padding: 2rem;
  margin-top: 5rem;
  margin-bottom: 15rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);

  h2 {
    text-align: center;
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }

  label {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #dbdbdb;
  }
`;

export const expandedContainer = css`
  width: 100%;
  max-width: 60rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    font-size: 3rem;
    color: white;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    font-size: 1.4rem;
    color: #ccc;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
  }
`;

export const numbercontainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const passwordcon = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const button2 = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const attendanceBtnWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

export const attendanceBtn = css`
  background-color: #1e88e5;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1565c0;
  }
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const modalBox = css`
  background: black;
  padding: 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
  min-width: 300px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

export const modalBtnGroup = css`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const attendanceInputBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
