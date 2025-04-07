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
    width: 55rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #d1d1d1;
    font-size: 1.5rem;
    color: black;
  }

  label {
    display: block;
    font-size: 1.5rem;
    color: #dbdbdb;
    margin-bottom: 0.5rem;
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
  width: 100%;
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
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const modalBox = css`
  background: #111;
  padding: 2rem 3rem;
  border-radius: 1.25rem;
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
  width: 90%;
  max-width: 60rem;
  height: 20rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* ✅ 중앙 정렬 추가 */

  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 1rem;
    font-size: 1.4rem;
    background-color: #2f2f2f;
    border: none;
    border-radius: 0.5rem;
    color: white;
    margin-bottom: 2rem;
  }
`;

export const modalBtnGroup = css`
  display: flex;
  justify-content: center; /* ✅ 버튼 가운데로 */
  align-items: center;
  gap: 1.5rem;
  width: 100%;             /* ✅ 너비 꽉 채워서 중앙 정렬 가능하게 */
  margin-top: 1rem;
`;

export const input = css`
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 2rem;
  background-color: #333;
  color: white;

  &::placeholder {
    color: #aaa;
  }
`;

export const attendanceInputBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;