import { css } from "@emotion/react";

export const topcon = css`
  position: relative;
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: flex-start;
  gap: 10rem; 
  width: 100%;
  margin-top: 5rem;
`;

export const maincontainer = (isExpanded = false) => css`
  ${isExpanded
    ? `
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    overflow-y: auto;
  `
    : `
    width: 50rem;
    position: relative;
  `}
  
  padding: 2rem;
  margin-top: 5rem;
  margin-bottom: 15rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);

  h2 {
    display: flex;
    justify-content: center;
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }

  label {
    display: flex;
    justify-content: flex-start;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #dbdbdb;
  }
`;

export const calendarWrapper = css`
  width: 450px; 
  margin-top: 5rem; 
`;

export const numbercontainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const passwordcon = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

export const input = css`
  width: 20rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d1d1d1;
  font-size: 1.5rem;
  color: black;
`;

export const input2 = css`
  width: 20rem;
  padding: 10px;
  margin-bottom: 10px;
  border: none; 
  border-radius: 5px;
  background-color: #d1d1d1;
  font-size: 1.5rem;
  color: black;
`;

export const button = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-left: 1rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const button2 = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const buttonContainer = css`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
`;

export const togglebtn = css`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #a61717;
  }
`;

export const boxStyle = css`
  position: "absolute";
  top: 0;
  left: 0;
  width: "100%";
  height: "100%";
  display: "flex";
  align-items: "center";
  justify-content: "center";
  font-size: "3.2rem";
  font-weight: "bold";
  color: "white";
  transition: "transform 0.5s, opacity 0.5s";
  
  padding: 2rem;
  margin-top: 5rem;
  margin-bottom: 15rem;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0rem 0.25rem 0.625rem rgba(255, 255, 255, 0.1);
`;

export const expandedContainer = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  width: 50vw;
  max-width: 600px;
  height: auto;
  background-color: black;
  border-radius: 1.75rem;
  border: 0.125rem solid #444;
  color: white;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  padding: 2rem;
  transition: all 0.3s ease-in-out;
  z-index: 1000; /* 최상위 */
`;

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* 반투명 배경 */
  z-index: 999;
`;