import { css } from "@emotion/react";

export const topGroup = css`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 5rem;
  width: 50%;
  cursor: default;
  gap: 10px;
`;

export const topimg = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
`;

export const button = css`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkred;
  }
`;

export const calendarWrapper = css`
  width: 100%;
  margin-top: 2rem;
  padding: 20px;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;2

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

export const box1 = css`
  display: flex;
  justify-content: center;
  font-size: 2rem;
`;

export const box2 = css`
  display: flex;
  flex-direction: row;
  font-size: 2rem;

  label {
    margin-right: 2rem;
  }
`;